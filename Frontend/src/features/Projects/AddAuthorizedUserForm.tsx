import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { AuthorizedUser } from "../../schemas/SchemaAddProject"

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
})

type UserFormData = z.infer<typeof userSchema>

interface AddAuthorizedUserFormProps {
  open: boolean
  onClose: () => void
  onSave: (user: UserFormData) => void
  editUser?: AuthorizedUser
}

const AddAuthorizedUserForm: React.FC<AddAuthorizedUserFormProps> = ({
  open,
  onClose,
  onSave,
  editUser,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: editUser?.name || "",
      email: editUser?.email || "",
    },
  })

  React.useEffect(() => {
    if (open) {
      reset({
        name: editUser?.name || "",
        email: editUser?.email || "",
      })
    }
  }, [open, editUser, reset])

  const onSubmit = (data: UserFormData) => {
    onSave(data)
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{editUser ? "Edit User" : "Add Authorized User"}</DialogTitle>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editUser ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddAuthorizedUserForm