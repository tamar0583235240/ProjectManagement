// src/features/auth/components/SetPasswordForm.tsx
import { Button, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { z } from "zod";
import { setPasswordSchema } from "../schemas/SchemaSetPassword";
import { useSetPasswordMutation } from "../features/users/userApi";

type SetPasswordData = z.infer<typeof setPasswordSchema>;

interface Props {
  token: string;
}

export const SetPasswordForm = ({ token }: Props) => {
  const [setPassword, { isLoading }] = useSetPasswordMutation();
  const methods = useForm<SetPasswordData>({
    resolver: zodResolver(setPasswordSchema),
  });

  const onSubmit = async (data: SetPasswordData) => {
    try {
      await setPassword({ ...data, token }).unwrap();
      // ניווט או הודעה על הצלחה
    } catch (err) {
      console.error("שגיאה בהגדרת סיסמה", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <TextField
          label="שם משתמש"
          {...methods.register("user_name")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="סיסמה"
          type="password"
          {...methods.register("password")}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          שמור
        </Button>
      </form>
    </FormProvider>
  );
};
