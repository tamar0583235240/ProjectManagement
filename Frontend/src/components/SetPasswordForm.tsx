
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../schemas/SchemaSetPassword";
import { z } from "zod";
import { useState } from "react";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetPasswordMutation } from "../features/User/userApi";

type SetPasswordData = z.infer<typeof setPasswordSchema>;
type Props = {
  token: string;
};

const SetPasswordForm = ({ token }: Props) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordData>({
    resolver: zodResolver(setPasswordSchema),
  });

  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const onSubmit = async (data: SetPasswordData) => {
    try {
      await setPassword({ token, ...data }).unwrap();
      navigate("/landingPage");
    } catch (err: any) {
      setError(err?.data?.message || "Error saving password");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "background.paper",
        padding: 4,
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" color="primary" align="center">
        Set Password
      </Typography>
      <TextField
        label="Username"
        {...register("user_name")}
        error={!!errors.user_name}
        helperText={errors.user_name?.message}
        fullWidth
      />
      <TextField
        label="New Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "warning.main",
          "&:hover": { backgroundColor: "warning.dark" },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save Password"}
      </Button>
    </Box>
  );
};

export default SetPasswordForm;
