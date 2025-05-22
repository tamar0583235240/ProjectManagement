// // src/features/auth/components/SetPasswordForm.tsx
// import { Button, TextField } from "@mui/material";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";


// import { z } from "zod";
// import { setPasswordSchema } from "../schemas/SchemaSetPassword";
// import { useSetPasswordMutation } from "../features/users/userApi";

// type SetPasswordData = z.infer<typeof setPasswordSchema>;

// interface Props {
//   token: string;
// }

// export const SetPasswordForm = ({ token }: Props) => {
//   const [setPassword, { isLoading }] = useSetPasswordMutation();
//   const methods = useForm<SetPasswordData>({
//     resolver: zodResolver(setPasswordSchema),
//   });

//   const onSubmit = async (data: SetPasswordData) => {
//     try {
//       await setPassword({ ...data, token }).unwrap();
//       // ניווט או הודעה על הצלחה
//     } catch (err) {
//       console.error("שגיאה בהגדרת סיסמה", err);
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
//         <TextField
//           label="שם משתמש"
//           {...methods.register("user_name")}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="סיסמה"
//           type="password"
//           {...methods.register("password")}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" disabled={isLoading}>
//           שמור
//         </Button>
//       </form>
//     </FormProvider>
//   );
// };


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../schemas/SchemaSetPassword";
import { z } from "zod";

import { useState } from "react";
import { Button, TextField, Typography, Box,CircularProgress,
} from "@mui/material";
import { useSetPasswordMutation } from "../features/users/userApi";

type Props = {
  token: string;
};

const SetPasswordForm=({ token }: Props)=>{
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<setPasswordSchema>({
    resolver: zodResolver(setPasswordSchema),
  });

  const [setPassword, { isLoading }] = useSetPasswordMutation();

  const onSubmit = async (data:setPasswordSchema) => {
    try {
      await setPassword({ token, ...data }).unwrap();
      setSuccess(true);
    } catch (err: any) {
      setError(err?.data?.message || "שגיאה בשמירת הסיסמה");
    }
  };

  if (success) {
    return <Typography color="primary">הסיסמה נשמרה בהצלחה! אפשר להתחבר.</Typography>;
  }

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
        backgroundColor: "#e3f2fd", // תכלת בהיר
        padding: 4,
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" color="primary" align="center">
        הגדרת סיסמה
      </Typography>
      <TextField
        label="שם משתמש"
        {...register("user_name")}
        error={!!errors.user_name}
        helperText={errors.user_name?.message}
        fullWidth
      />
      <TextField
        label="סיסמה חדשה"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: "#ff9800", // כתום
          "&:hover": { backgroundColor: "#fb8c00" },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "שמור סיסמה"}
      </Button>
    </Box>
  );
}
export default SetPasswordForm;
