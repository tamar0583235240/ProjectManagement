import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddEmployeeSchema, type AddEmployeeInput } from "../../schemas/SchemaUser";
import { useAddEmployeeMutation } from "./usersApi";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";

export const AddEmployeeForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddEmployeeInput>({
    resolver: zodResolver(AddEmployeeSchema),
  });

  const [addEmployee, { isLoading, isSuccess, isError }] = useAddEmployeeMutation();

  const onSubmit = async (data: AddEmployeeInput) => {
    try {
      await addEmployee(data).unwrap();
      reset();
      alert("העובד נוסף ונשלח מייל הצטרפות");
    } catch (error) {
      alert("שגיאה בהוספת עובד");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={2}>הוספת עובד חדש</Typography>

      <TextField
        label="שם מלא"
        fullWidth
        margin="normal"
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />

      <TextField
        label="אימייל"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        select
        label="תפקיד"
        fullWidth
        margin="normal"
        defaultValue=""
        {...register("role")}
        error={!!errors.role}
        helperText={errors.role?.message}
      >
        <MenuItem value="team_leader">ראש צוות</MenuItem>
        <MenuItem value="employee">עובד</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        {isLoading ? "שולח..." : "הוסף עובד"}
      </Button>
    </Box>
  );
};
