
import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { SchemaSignIn, type SignInFormData } from "../../schemas/SchemaSignIn"
import { useSignInMutation } from "./authApi"
import { useCookies } from "react-cookie"
import type { SignInResponse } from "../../types/SignInResponse"

interface SignInDialogProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void // פרופ חדש
}

const SignIn: React.FC<SignInDialogProps> = ({ open, onClose, onSuccess }) => {

  const [SignIn] = useSignInMutation();
  const [cookies, setCookies] = useCookies(['token'])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormData>({
    resolver: zodResolver(SchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    console.log(data);
    try {
      const response = await SignIn(data).unwrap();
      console.log("response:", response);
      const { accessToken, user } = response;
      setCookies("token", accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Sign in successful!");
      onClose();
      reset();

      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error("Sign in error:", error);
      alert("Sign in failed. Please try again.");
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>Sign In</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Please enter your credentials to sign in.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="email"
            placeholder="Enter email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={() => { onClose(); reset(); }} color="primary">
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
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignIn