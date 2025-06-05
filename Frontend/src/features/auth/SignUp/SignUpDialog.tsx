
import React, { useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SchemaSignUp, type FormData } from "../../../schemas/SchemaSignUp"
import SignUpForm from "./SignUpForm"
import SignUpOrganizationContainer from "../../organizations/SignUpOrganizationContainer"

interface SignUpDialogProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, onClose, onSuccess }) => {
  const [openOrgDialog, setOpenOrgDialog] = useState(false)
  const [userData, setUserData] = useState<FormData | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(SchemaSignUp),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      creditCard: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("User registration data:", data)
    setUserData(data)
    setOpenOrgDialog(true)
  }

  const handleCloseOrgDialog = () => {
    onClose()
    setOpenOrgDialog(false)
    reset()
    if (onSuccess) onSuccess()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Admin Registration</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Fill in the form below to register as an admin.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <SignUpForm register={register} errors={errors} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { onClose(); reset(); }}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">Next</Button>
        </DialogActions>
      </Dialog>
      <SignUpOrganizationContainer
        open={openOrgDialog}
        onClose={handleCloseOrgDialog}
        userData={userData}
        onSuccess={onSuccess}
      />
    </>
  )
}

export default SignUpDialog
