<<<<<<< HEAD
import React from "react"
=======
>>>>>>> Frontend/Employees
import { zodResolver } from "@hookform/resolvers/zod"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
<<<<<<< HEAD
=======
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
>>>>>>> Frontend/Employees
import { type FormData } from "../../schemas/SchemaSignUp"
import { useSignUpMutation } from "../auth/authApi"
import type { Organization } from "../../types/Organization"
import type { User } from "../../types/User"
<<<<<<< HEAD
import { useAddOrganizationMutation } from "../organizations/organizationsApi"
import { SchemaOrganization, type OrganizationFormData } from "../../schemas/SchemaSignUpOrganization"
import { useForm } from "react-hook-form"
import { useCookies } from "react-cookie"
=======

>>>>>>> Frontend/Employees
interface OrganizationDialogProps {
    open: boolean
    onClose: () => void
    userData: FormData | null
    onSuccess?: () => void

}

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({ open, onClose, userData, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<OrganizationFormData>({
        resolver: zodResolver(SchemaOrganization),
        defaultValues: {
            organization_name: "",
            organization_description: "",
            organization_address: "",
            organization_phone: "",
        },
    })

<<<<<<< HEAD
    const [addOrganization] = useAddOrganizationMutation();
    const [addUser] = useSignUpMutation();
    const [cookies, setCookies] = useCookies(['token'])
    const onSubmit = async (organizationData: OrganizationFormData) => {
        if (!organizationData || !userData) {
            console.error("Missing organization or user data.");
            return;
        }
=======
  const [addOrganization] = useAddOrganizationMutation()
  const [addUser] = useSignUpMutation()
  const [cookies, setCookies] = useCookies(["token"])
  const navigate = useNavigate()
>>>>>>> Frontend/Employees

        console.log("User data:", userData);
        console.log("Organization data:", organizationData);

        if (organizationData && userData) {
            const organization: Organization = {
                organization_name: organizationData.organization_name,
                organization_description: organizationData.organization_description,
                organization_address: organizationData.organization_address,
                organization_phone: organizationData.organization_phone,
                manager_id: null,
            };
            try {
                const resOrganization = await addOrganization(organization).unwrap();
                console.log("Organization registration response:", resOrganization);
                const user: User = {
                    user_name: userData.username,
                    password: userData.password,
                    email: userData.email,
                    role: "MANAGER",
                    manager_id: null,
                    organization_id: resOrganization._id,
                };
                console.log("User data after change:", user);
                const response = await addUser(user).unwrap();
                console.log("Response from addUser:", response);
                setCookies("token", response.accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
                localStorage.setItem("currentUser", JSON.stringify(response.user));

                alert("Registration completed successfully!");
                onClose();
                reset();
                if (onSuccess) {
                    onSuccess();
                }
            } catch (error: any) {
                console.error("Registration failed:", error);
                alert("Registration failed: " + (error?.data?.message || "Unknown error"));
            }
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>
                Organization Registration
            </DialogTitle>

            <DialogContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Please provide your organization details to complete registration.
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_name"
                        label="Organization Name"
                        placeholder="Enter organization name"
                        {...register("organization_name")}
                        error={!!errors.organization_name}
                        helperText={errors.organization_name?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_description"
                        label="Organization Description"
                        placeholder="Enter organization description"
                        multiline
                        rows={3}
                        {...register("organization_description")}
                        error={!!errors.organization_description}
                        helperText={errors.organization_description?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_address"
                        label="Organization Address"
                        placeholder="Enter organization address"
                        {...register("organization_address")}
                        error={!!errors.organization_address}
                        helperText={errors.organization_address?.message}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="organization_phone"
                        label="Organization Phone"
                        placeholder="Enter organization phone"
                        {...register("organization_phone")}
                        error={!!errors.organization_phone}
                        helperText={errors.organization_phone?.message}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sx={{
                        bgcolor: "#0d9488",
                        "&:hover": { bgcolor: "#0f766e" },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default OrganizationDialog
