// components/auth/SignUp/SignUpForm.tsx
import React from "react"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import type { UseFormRegister, FieldErrors } from "react-hook-form"
import type { FormData } from "../../../schemas/SchemaSignUp"

interface Props {
  register: UseFormRegister<FormData>
  errors: FieldErrors<FormData>
}

const SignUpForm: React.FC<Props> = ({ register, errors }) => (
  <>
    <TextField
      margin="normal"
      fullWidth
      id="username"
      label="Username"
      placeholder="Enter username"
      {...register("username")}
      error={!!errors.username}
      helperText={errors.username?.message}
    />
    <TextField
      margin="normal"
      fullWidth
      id="email"
      label="Email"
      type="email"
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
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle1" sx={{ fontWeight: "medium", color: "#0d9488", mb: 1 }}>
      Payment Information
    </Typography>
    <TextField
      margin="normal"
      fullWidth
      id="creditCard"
      label="Credit Card Number"
      placeholder="Enter credit card number"
      {...register("creditCard")}
      error={!!errors.creditCard}
      helperText={errors.creditCard?.message}
    />
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="expiryMonth"
          label="Month (MM)"
          placeholder="MM"
          inputProps={{ maxLength: 2 }}
          {...register("expiryMonth")}
          error={!!errors.expiryMonth}
          helperText={errors.expiryMonth?.message}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="expiryYear"
          label="Year (YY/YYYY)"
          placeholder="YY or YYYY"
          inputProps={{ maxLength: 4 }}
          {...register("expiryYear")}
          error={!!errors.expiryYear}
          helperText={errors.expiryYear?.message}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          id="cvv"
          label="CVV"
          placeholder="CVV"
          inputProps={{ maxLength: 4 }}
          {...register("cvv")}
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
        />
      </Grid>
    </Grid>
  </>
)

export default SignUpForm
