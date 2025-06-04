import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useForgotPasswordMutation } from "../features/auth/authApi";
import type { ForgotPasswordFormData } from "../types/ForgotPasswordFormData";
import { SchemaForgotPassword } from "../schemas/SchemaForgotPassword";

interface ForgotPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({ open, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(SchemaForgotPassword),
    defaultValues: { email: "" },
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(data).unwrap();
      alert(response.message || "Password reset email sent!");
      reset();
      onClose();
    } catch (error: any) {
      alert(error?.data?.message || "Failed to send password reset email.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488" }}>Forgot Password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter your email to receive a password reset link.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={() => { reset(); onClose(); }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          variant="contained"
          sx={{
            bgcolor: "#0d9488",
            "&:hover": { bgcolor: "#0f766e" },
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
