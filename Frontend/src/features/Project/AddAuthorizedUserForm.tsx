import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useValidateUserMutation } from "../User/userApi";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type UserFormData = z.infer<typeof userSchema>;

interface ValidatedUser {
  _id: string;
  user_name: string;
  email: string;
}

interface AddAuthorizedUserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: ValidatedUser) => void;
  editUser?: ValidatedUser;
}

const FormComponent: React.FC<{
  editUser?: ValidatedUser;
  onSave: (user: ValidatedUser) => void;
  onClose: () => void;
}> = ({ editUser, onSave, onClose }) => {
  const [validateUser, { isLoading, error }] = useValidateUserMutation();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: editUser?.user_name || "",
      email: editUser?.email || "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Validate user with the API
      const result = await validateUser({ 
        username: data.name, 
        email: data.email 
      }).unwrap();

      if (!result || !result._id) {
        // User validation failed
        return;
      }

      // User is valid, pass the validated user data with _id
      const validatedUser: ValidatedUser = {
        _id: result._id,
        user_name: data.name,
        email: data.email,
      };

      onSave(validatedUser);
      reset();
      onClose();
    } catch (err: any) {
      console.error("Server validation error:", err);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(error as any)?.data?.message || "User validation failed. Please check the details and try again."}
          </Alert>
        )}
        
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                margin="dense"
                autoFocus
                disabled={isSubmitting || isLoading}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="dense"
                disabled={isSubmitting || isLoading}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={isSubmitting || isLoading}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={isSubmitting || isLoading}
          startIcon={
            (isSubmitting || isLoading) ? <CircularProgress size={16} /> : undefined
          }
        >
          {editUser ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
};

const AddAuthorizedUserForm: React.FC<AddAuthorizedUserFormProps> = ({
  open,
  onClose,
  onSave,
  editUser,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{editUser ? "Edit User" : "Add Authorized User"}</DialogTitle>
      <FormComponent
        key={editUser?._id || "new"} // Use _id instead of id
        editUser={editUser}
        onSave={onSave}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default AddAuthorizedUserForm;