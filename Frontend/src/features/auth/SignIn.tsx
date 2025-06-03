
// import type React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import Dialog from "@mui/material/Dialog"
// import DialogActions from "@mui/material/DialogActions"
// import DialogContent from "@mui/material/DialogContent"
// import DialogTitle from "@mui/material/DialogTitle"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"
// import Box from "@mui/material/Box"
// import Typography from "@mui/material/Typography"
// import { SchemaSignIn, type SignInFormData } from "../../schemas/SchemaSignIn"
// import { useSignInMutation } from "./authApi"
// import { useCookies } from "react-cookie"
// import type { SignInResponse } from "../../types/SignInResponse"

// interface SignInDialogProps {
//   open: boolean
//   onClose: () => void
//   onSuccess?: () => void // פרופ חדש
// }

// const SignIn: React.FC<SignInDialogProps> = ({ open, onClose, onSuccess }) => {

//   const [SignIn] = useSignInMutation();
//   const [cookies, setCookies] = useCookies(['token'])

//   const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInFormData>({
//     resolver: zodResolver(SchemaSignIn),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const onSubmit = async (data: SignInFormData) => {
//     console.log(data);
//     try {
//       const response = await SignIn(data).unwrap();
//       console.log("response:", response);
//       const { accessToken, user } = response;
//       setCookies("token", accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       alert("Sign in successful!");
//       onClose();
//       reset();

//       if (onSuccess) {
//         onSuccess();
//       }

//     } catch (error) {
//       console.error("Sign in error:", error);
//       alert("Sign in failed. Please try again.");
//     }
//   };
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>Sign In</DialogTitle>

//       <DialogContent>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//           Please enter your credentials to sign in.
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             fullWidth
//             id="email"
//             label="email"
//             placeholder="Enter email"
//             {...register("email")}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />

//           <TextField
//             margin="normal"
//             fullWidth
//             id="password"
//             label="Password"
//             type="password"
//             placeholder="Enter password"
//             {...register("password")}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//           />
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 3 }}>
//         <Button onClick={() => { onClose(); reset(); }} color="primary">
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit(onSubmit)}
//           variant="contained"
//           sx={{
//             bgcolor: "#0d9488",
//             "&:hover": { bgcolor: "#0f766e" },
//           }}
//         >
//           Sign In
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default SignIn

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { SchemaSignIn, type SignInFormData } from "../../schemas/SchemaSignIn";
// import { useSignInMutation } from "./authApi";
// import { useCookies } from "react-cookie";

// interface ForgotPasswordFormData {
//   email: string;
// }

// interface SignInDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// const SignIn: React.FC<SignInDialogProps> = ({ open, onClose, onSuccess }) => {
//   const [SignIn] = useSignInMutation();
//   const [cookies, setCookies] = useCookies(["token"]);
//   const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<SignInFormData>({
//     resolver: zodResolver(SchemaSignIn),
//     defaultValues: { email: "", password: "" },
//   });

//   const {
//     register: registerForgot,
//     handleSubmit: handleSubmitForgot,
//     formState: { errors: errorsForgot },
//     reset: resetForgot,
//   } = useForm<ForgotPasswordFormData>({
//     defaultValues: { email: "" },
//   });

//   const onSubmit = async (data: SignInFormData) => {
//     try {
//       const response = await SignIn(data).unwrap();
//       const { accessToken, user } = response;
//       setCookies("token", accessToken, { path: "/", maxAge: 3600 * 24 * 7 });
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       alert("Sign in successful!");
//       onClose();
//       reset();
//       if (onSuccess) onSuccess();
//     } catch (error) {
//       alert("Sign in failed. Please try again.");
//     }
//   };

//   const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
//     try {
//       const res = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: data.email }),
//       });

//       if (res.ok) {
//         alert("If this email exists, a reset link has been sent.");
//         resetForgot();
//         setForgotPasswordMode(false);
//       } else {
//         alert("Error occurred, please try again.");
//       }
//     } catch {
//       alert("Error occurred, please try again.");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={() => {
//         onClose();
//         reset();
//         resetForgot();
//         setForgotPasswordMode(false);
//       }}
//       maxWidth="sm"
//       fullWidth
//     >
//       <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>
//         {forgotPasswordMode ? "Forgot Password" : "Sign In"}
//       </DialogTitle>

//       <DialogContent>
//         {!forgotPasswordMode && (
//           <>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Please enter your credentials to sign in.
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="email"
//                 label="Email"
//                 placeholder="Enter email"
//                 {...register("email")}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 id="password"
//                 label="Password"
//                 type="password"
//                 placeholder="Enter password"
//                 {...register("password")}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />
//             </Box>

//             <Button
//               variant="text"
//               sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
//               onClick={() => setForgotPasswordMode(true)}
//             >
//               Forgot Password?
//             </Button>
//           </>
//         )}

//         {forgotPasswordMode && (
//           <>
//             <Typography sx={{ mb: 2 }}>
//               Enter your email to receive a password reset link.
//             </Typography>
//             <Box component="form" onSubmit={handleSubmitForgot(onForgotPasswordSubmit)} noValidate sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 {...registerForgot("email", { required: "Email is required" })}
//                 error={!!errorsForgot.email}
//                 helperText={errorsForgot.email?.message}
//               />
//               <DialogActions sx={{ px: 0, pt: 0 }}>
//                 <Button onClick={() => setForgotPasswordMode(false)}>Back</Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   sx={{ bgcolor: "#0d9488", "&:hover": { bgcolor: "#0f766e" } }}
//                 >
//                   Send
//                 </Button>
//               </DialogActions>
//             </Box>
//           </>
//         )}
//       </DialogContent>

//       {!forgotPasswordMode && (
//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button onClick={() => { onClose(); reset(); }} color="primary">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit(onSubmit)}
//             variant="contained"
//             sx={{
//               bgcolor: "#0d9488",
//               "&:hover": { bgcolor: "#0f766e" },
//             }}
//           >
//             Sign In
//           </Button>
//         </DialogActions>
//       )}
//     </Dialog>
//   );
// };

// export default SignIn;


// src/features/auth/SignIn.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SchemaSignIn, type SignInFormData } from "../../schemas/SchemaSignIn";
import { useSignInMutation } from "./authApi";
import { useCookies } from "react-cookie";
import ForgotPasswordDialog from "../../components/ForgotPasswordDialog";
// import ForgotPasswordDialog from "./ForgotPasswordDialog";

interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SignIn: React.FC<SignInDialogProps> = ({ open, onClose, onSuccess }) => {
  const [signIn] = useSignInMutation();
  const [cookies, setCookies] = useCookies(["token"]);
  const [showForgotDialog, setShowForgotDialog] = useState(false);

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
    } catch (error) {
      alert("Sign in failed. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#0d9488", fontSize: "1.25rem" }}>
          Sign In
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please enter your credentials to sign in.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
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

          <Button
            variant="text"
            sx={{ mt: 1, textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setShowForgotDialog(true)}
          >
            Forgot Password?
          </Button>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ bgcolor: "#0d9488", "&:hover": { bgcolor: "#0f766e" } }}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      {/* קומפוננטת שכחתי סיסמה */}
      <ForgotPasswordDialog
        open={showForgotDialog}
        onClose={() => setShowForgotDialog(false)}
      />
    </>
  );
};

export default SignIn;
