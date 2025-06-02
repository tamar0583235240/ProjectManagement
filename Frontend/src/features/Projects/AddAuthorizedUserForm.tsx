import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useValidateUserMutation } from "../User/userApi"
import type { AuthorizedUserFormData } from "../../schemas/SchemaAddProject"

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
})

type UserFormData = z.infer<typeof userSchema>

interface AddAuthorizedUserFormProps {
  open: boolean
  onClose: () => void
  onSave: (user: UserFormData) => void
  editUser?: AuthorizedUserFormData
}

const FormComponent: React.FC<{
  editUser?: AuthorizedUserFormData
  onSave: (user: UserFormData) => void
  onClose: () => void
}> = ({ editUser, onSave, onClose }) => {
  const [validateUser, { isLoading }] = useValidateUserMutation()

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: editUser?.name || "",
      email: editUser?.email || "",
    },
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      const result = await validateUser({ username: data.name, email: data.email }).unwrap()

      if (!result || !result._id) {
        alert("User is invalid or already exists.")
        return
      }

      onSave(data)
      onClose()
    } catch (err) {
      console.error("Server validation error:", err)
      alert("Failed to validate user. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
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
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting || isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting || isLoading}>
          {(isSubmitting || isLoading) ? <CircularProgress size={20} /> : editUser ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </form>
  )
}

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
        key={editUser?.email ?? "new"}
        editUser={editUser}
        onSave={onSave}
        onClose={onClose}
      />
    </Dialog>
  )
}

export default AddAuthorizedUserForm

