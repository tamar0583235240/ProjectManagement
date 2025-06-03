// features/auth/ResetPasswordPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchemaResetPassword,
  type ResetPasswordFormData,
  passwordMatchRefinement,
} from "../../schemas/SchemaResetPassword";
import { useResetPasswordMutation } from "./authApi";
import { Box, Button, TextField, Typography } from "@mui/material";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(passwordMatchRefinement),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({ token: token || "", password: data.password }).unwrap();
      alert("Password updated successfully!");
      navigate("/login");
    } catch (err: any) {
      alert(err?.data?.message || "Reset failed.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Reset Your Password</Typography>
      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordPage;
