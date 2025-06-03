
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { setPasswordSchema } from "../schemas/SchemaSetPassword";
// import { z } from "zod";
// import { useState } from "react";
// import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
// import { useSetPasswordMutation } from "../features/users/userApi";

// type SetPasswordData = z.infer<typeof setPasswordSchema>;

// type Props = {
//   token: string;
// };

// const SetPasswordForm = ({ token }: Props) => {
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SetPasswordData>({
//     resolver: zodResolver(setPasswordSchema),
//   });

//   const [setPassword, { isLoading }] = useSetPasswordMutation();

//   const onSubmit = async (data: SetPasswordData) => {
//     try {
//       await setPassword({ token, ...data }).unwrap();
//       setSuccess(true);
//     } catch (err: any) {
//       setError(err?.data?.message || "שגיאה בשמירת הסיסמה");
//     }
//   };

//   if (success) {
//     return <Typography color="primary">הסיסמה נשמרה בהצלחה! אפשר להתחבר.</Typography>;
//   }

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       sx={{
//         maxWidth: 400,
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         backgroundColor: "#e3f2fd",
//         padding: 4,
//         borderRadius: 4,
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Typography variant="h5" color="primary" align="center">
//         הגדרת סיסמה
//       </Typography>
//       <TextField
//         label="שם משתמש"
//         {...register("user_name")}
//         error={!!errors.user_name}
//         helperText={errors.user_name?.message}
//         fullWidth
//       />
//       <TextField
//         label="סיסמה חדשה"
//         type="password"
//         {...register("password")}
//         error={!!errors.password}
//         helperText={errors.password?.message}
//         fullWidth
//       />
//       {error && <Typography color="error">{error}</Typography>}
//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{
//           backgroundColor: "#ff9800",
//           "&:hover": { backgroundColor: "#fb8c00" },
//         }}
//         disabled={isLoading}
//       >
//         {isLoading ? <CircularProgress size={24} color="inherit" /> : "שמור סיסמה"}
//       </Button>
//     </Box>
//   );
// };

// export default SetPasswordForm;
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../schemas/SchemaSetPassword";
import { z } from "zod";
import { useState } from "react";
import { Button, TextField, Typography, Box, CircularProgress } from "@mui/material";
import { useSetPasswordMutation } from "../features/users/userApi";
import { useNavigate } from "react-router-dom";

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
      navigate("/landing"); // ✅ ניווט מיידי לדף הנחיתה
    } catch (err: any) {
      setError(err?.data?.message || "שגיאה בשמירת הסיסמה");
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
        backgroundColor: "#e3f2fd",
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
          backgroundColor: "#ff9800",
          "&:hover": { backgroundColor: "#fb8c00" },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "שמור סיסמה"}
      </Button>
    </Box>
  );
};

export default SetPasswordForm;
