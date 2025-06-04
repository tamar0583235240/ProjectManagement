
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SchemaSignIn, type SignInFormData } from "../../../schemas/SchemaSignIn";
import { useSignInMutation } from "../authApi";
import { useCookies } from "react-cookie";

interface SignInFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  onForgotClick: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onClose, onSuccess, onForgotClick }) => {
  const [signIn] = useSignInMutation();
  const [_, setCookies] = useCookies(["token"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(SchemaSignIn),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data).unwrap();
      const { accessToken, user } = response;
      setCookies("token", accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Sign in successful!");
      onClose();
      reset();
      if (onSuccess) onSuccess();
    } catch {
      alert("Sign in failed. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="Email"
        placeholder="Enter email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        fullWidth
        margin="normal"
        id="password"
        label="Password"
        type="password"
        placeholder="Enter password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        variant="text"
        onClick={onForgotClick}
        sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
      >
        Forgot Password?
      </Button>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button type="submit" variant="contained">
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignInForm;
