// // features/auth/ResetPasswordPage.tsx
// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   SchemaResetPassword,
//   type ResetPasswordFormData,
//   passwordMatchRefinement,
// } from "../../schemas/SchemaResetPassword";
// import { useResetPasswordMutation } from "./authApi";
// import { Box, Button, TextField, Typography } from "@mui/material";

// const ResetPasswordPage: React.FC = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [resetPassword] = useResetPasswordMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ResetPasswordFormData>({
//     resolver: zodResolver(passwordMatchRefinement),
//   });

//   const onSubmit = async (data: ResetPasswordFormData) => {
//     try {
//       await resetPassword({ token: token || "", password: data.password }).unwrap();
//       alert("Password updated successfully!");
//       navigate("/login");
//     } catch (err: any) {
//       alert(err?.data?.message || "Reset failed.");
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 6 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>Reset Your Password</Typography>
//       <TextField
//         label="New Password"
//         type="password"
//         fullWidth
//         margin="normal"
//         {...register("password")}
//         error={!!errors.password}
//         helperText={errors.password?.message}
//       />
//       <TextField
//         label="Confirm Password"
//         type="password"
//         fullWidth
//         margin="normal"
//         {...register("confirmPassword")}
//         error={!!errors.confirmPassword}
//         helperText={errors.confirmPassword?.message}
//       />
//       <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//         Reset Password
//       </Button>
//     </Box>
//   );
// };

// export default ResetPasswordPage;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchemaResetPassword,
  type ResetPasswordFormData,
  passwordMatchRefinement,
} from "../../schemas/SchemaResetPassword";
import { useResetPasswordMutation } from "./authApi";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({ token: token || "", password: data.password }).unwrap();
      alert("Password updated successfully!");
      navigate("/landingPage");

    } catch (err: any) {
      alert(err?.data?.message || "Reset failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Reset Your Password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Enter your new password below.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message || "At least 8 characters"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message || "Repeat the password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirm} edge="end">
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
