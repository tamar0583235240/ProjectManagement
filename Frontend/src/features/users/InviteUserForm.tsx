
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SelectTeamLeader from "./SelectTeamLeader";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetTeamLeadersQuery, useInviteUserMutation } from "./userApi";
import { inviteUserSchema, type InviteUserInput } from "../../schemas/inviteUserSchema";
import { Role } from "../../types/Role";
import { grey } from "@mui/material/colors";


// const InviteUserForm: React.FC = () => {
//   const user = useCurrentUser();
//   const userId = user?._id;

//   const { data: teamLeads = [] } = useGetTeamLeadersQuery(userId, {
//     skip: !userId,
//   });
//   const hasTeamLeads = teamLeads.length > 0;

//   const [inviteUser, { isLoading }] = useInviteUserMutation();

//   const form = useForm<InviteUserInput>({
//     resolver: zodResolver(inviteUserSchema),
//     defaultValues: {
//       role: Role.TEAMLEADER,
//     },
//   });

//   const role = form.watch("role");

//   const onSubmit = async (data: InviteUserInput) => {
//     const payload = {
//       ...data,
//       manager_id: data.role === Role.EMPLOYEE ? data.teamLeadId : user._id,
//       organization_id: user.organization_id,
//     };

//     try {
//       await inviteUser(payload).unwrap();
//       form.reset();
//     } catch (error) {
//       console.error("שגיאה בשליחת ההזמנה:", error);
//     }
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
//       <TextField
//         label="אימייל"
//         {...form.register("email")}
//         fullWidth
//         margin="normal"
//         error={!!form.formState.errors.email}
//         helperText={form.formState.errors.email?.message}
//       />

//       <TextField select label="תפקיד" {...form.register("role")} fullWidth margin="normal">
//         {!hasTeamLeads && <MenuItem value={Role.TEAMLEADER}>ראש צוות</MenuItem>}
//         {hasTeamLeads && (
//           <>
//             <MenuItem value={Role.TEAMLEADER}>ראש צוות</MenuItem>
//             <MenuItem value={Role.EMPLOYEE}>עובד</MenuItem>
//           </>
//         )}
//       </TextField>

//       {role === Role.EMPLOYEE && hasTeamLeads && <SelectTeamLeader control={form.control} />}

//       <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
//         שלח הזמנה
//       </Button>
//     </form>
//   );
// };

// export default InviteUserForm;
const InviteUserForm: React.FC<{ onSave: (data: InviteUserInput) => Promise<void>, isLoading: boolean, onClose: () => void }> = ({ onSave, isLoading: isSubmitting, onClose }) => {
  const user = useCurrentUser();
  const userId = user?._id;

  const { data: teamLeads = [], isLoading: teamLeadsLoading } = useGetTeamLeadersQuery(userId, {
    skip: !userId,
  });
  const hasTeamLeads = teamLeads.length > 0;

  const [inviteUserMutation, { isLoading: inviteLoading }] = useInviteUserMutation();

  // Using the mock useForm
 
  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: Role.TEAMLEADER,
    },
  });

  const role = form.watch("role");

  const onSubmit = async (data: InviteUserInput) => {
    const payload = {
      ...data,
      manager_id: data.role === Role.EMPLOYEE ? data.teamLeadId : user._id,
      organization_id: user.organization_id,
    };

    try {
      // Removed .unwrap() as the mock mutation function directly returns a promise
      await inviteUserMutation(payload); 
      form.reset(); // Reset form after successful submission
      onClose(); // Close the dialog on success
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה:", error);
      // You can set a form error here if needed
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 2 }}>
        <InputLabel shrink htmlFor="email-input-invite" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
          Email
        </InputLabel>
        <TextField
          id="email-input-invite"
          margin="dense"
          type="email"
          fullWidth
          variant="outlined"
          {...form.register("email")}
          error={!!form.formState.errors.email}
          helperText={form.formState.errors.email?.message}
          InputLabelProps={{ shrink: false }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, mt: 0 }}
        />
      </FormControl>

      <FormControl fullWidth margin="dense" variant="outlined" error={!!form.formState.errors.role} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, mb: 2 }}>
        <InputLabel shrink htmlFor="role-select-invite" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
          Role
        </InputLabel>
        <Select
          id="role-select-invite"
          label="Role"
          {...form.register("role")}
          value={role}
          sx={{ mt: 0 }}
        >
          {!hasTeamLeads && <MenuItem value={Role.TEAMLEADER}>Team Leader</MenuItem>}
          {hasTeamLeads && (
            <>
              <MenuItem value={Role.TEAMLEADER}>Team Leader</MenuItem>
              <MenuItem value={Role.EMPLOYEE}>Employee</MenuItem>
            </>
          )}
        </Select>
        {form.formState.errors.role && <FormHelperText>{form.formState.errors.role?.message}</FormHelperText>}
      </FormControl>

      {role === Role.EMPLOYEE && hasTeamLeads && (
        <SelectTeamLeader
          control={form.control}
          teamLeads={teamLeads}
          error={!!form.formState.errors.teamLeadId}
          helperText={form.formState.errors.teamLeadId?.message}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, borderTop: `1px solid ${grey[200]}`, pt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || inviteLoading}
          sx={{
            background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", 
            boxShadow: 3,
            px: 3,
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #0097A7 0%, #00ACC1 100%)",
              boxShadow: 6,
            },
          }}
        >
          {isSubmitting || inviteLoading ? <CircularProgress size={24} color="inherit" /> : "Send Invitation"}
        </Button>
      </Box>
    </form>
  );
};

export default InviteUserForm
