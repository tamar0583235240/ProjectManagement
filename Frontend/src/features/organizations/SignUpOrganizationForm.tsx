// // components/signup/SignUpOrganizationForm.tsx
// import React from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material"
// import type { OrganizationFormData } from "../../schemas/SchemaSignUpOrganization"
// import { UseFormRegister, FieldErrors } from "react-hook-form"


// interface Props {
//   open: boolean
//   onClose: () => void
//   onSubmit: () => void
//   register: UseFormRegister<OrganizationFormData>
//   errors: FieldErrors<OrganizationFormData>
//   onCancel: () => void
// }

// const SignUpOrganizationForm: React.FC<Props> = ({
//   open,
//   onClose,
//   onSubmit,
//   register,
//   errors,
//   onCancel,
// }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Organization Registration</DialogTitle>

//       <DialogContent>
//         <Typography variant="body2" color="text.secondary">
//           Please provide your organization details to complete registration.
//         </Typography>

//         <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit() }} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Organization Name"
//             {...register("organization_name")}
//             error={!!errors.organization_name}
//             helperText={errors.organization_name?.message}
//           />

//           <TextField
//             margin="normal"
//             fullWidth
//             label="Organization Description"
//             multiline
//             rows={3}
//             {...register("organization_description")}
//             error={!!errors.organization_description}
//             helperText={errors.organization_description?.message}
//           />

//           <TextField
//             margin="normal"
//             fullWidth
//             label="Organization Address"
//             {...register("organization_address")}
//             error={!!errors.organization_address}
//             helperText={errors.organization_address?.message}
//           />

//           <TextField
//             margin="normal"
//             fullWidth
//             label="Organization Phone"
//             {...register("organization_phone")}
//             error={!!errors.organization_phone}
//             helperText={errors.organization_phone?.message}
//           />
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onCancel}>Cancel</Button>
//         <Button onClick={onSubmit} variant="contained">Save</Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default SignUpOrganizationForm

// components/signup/SignUpOrganizationForm.tsx
import React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material"
import type { OrganizationFormData } from "../../schemas/SchemaSignUpOrganization"
import type { UseFormRegister, FieldErrors } from "react-hook-form" // תיקון: UseFormRegister ו-FieldErrors הם טיפוסים (type)

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  register: UseFormRegister<OrganizationFormData>
  errors: FieldErrors<OrganizationFormData>
  onCancel: () => void
}

const SignUpOrganizationForm: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  register,
  errors,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Organization Registration</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Please provide your organization details to complete registration.
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Organization Name"
            {...register("organization_name")}
            error={!!errors.organization_name}
            helperText={errors.organization_name?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Organization Description"
            multiline
            rows={3}
            {...register("organization_description")}
            error={!!errors.organization_description}
            helperText={errors.organization_description?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Organization Address"
            {...register("organization_address")}
            error={!!errors.organization_address}
            helperText={errors.organization_address?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Organization Phone"
            {...register("organization_phone")}
            error={!!errors.organization_phone}
            helperText={errors.organization_phone?.message}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignUpOrganizationForm
