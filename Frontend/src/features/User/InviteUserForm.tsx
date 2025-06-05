import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SelectTeamLeader from "./SelectTeamLeader";
import useCurrentUser from "../../hooks/useCurrentUser";
import { inviteUserSchema, type InviteUserInput } from "../../schemas/inviteUserSchema";
import { Role } from "../../types/Role";
import { grey } from "@mui/material/colors";
import { useGetTeamLeadersQuery, useInviteUserMutation } from "../users/userApi";

const InviteUserForm: React.FC<{ onSave: (data: InviteUserInput) => Promise<void>, isLoading: boolean, onClose: () => void }> = ({ onSave, isLoading: isSubmitting, onClose }) => {
  const user = useCurrentUser();
  const userId = user?._id;
  const isManager = user?.role === Role.MANAGER;

  const { data: teamLeads = [], isLoading: teamLeadsLoading, isSuccess: teamLeadsFetched } = useGetTeamLeadersQuery(userId!, {
    skip: !userId || !isManager,
  });
  const hasTeamLeads = teamLeads.length > 0;

  const [inviteUserMutation, { isLoading: inviteLoading }] = useInviteUserMutation();

  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: hasTeamLeads ? Role.EMPLOYEE : Role.TEAMLEADER,
    },
  });

  const role = form.watch("role");

  useEffect(() => {
    if (!hasTeamLeads && role === Role.EMPLOYEE) {
      form.setValue("role", Role.TEAMLEADER);
    }
    if (hasTeamLeads && role === Role.TEAMLEADER && form.getValues("teamLeadId")) {
      form.setValue("teamLeadId", undefined);
    }
    if (!hasTeamLeads) {
      form.setValue("teamLeadId", undefined);
    }
  }, [hasTeamLeads, role, form]);

  const onSubmit = async (data: InviteUserInput) => {
    if (data.role === Role.EMPLOYEE && !hasTeamLeads) {
      console.warn("Cannot invite an employee when no team leaders are available.");
      return;
    }

    const payload = {
      ...data,
      manager_id: data.role === Role.EMPLOYEE ? data.teamLeadId : user?._id,
      organization_id: user?.organization_id,
    };

    try {
      await inviteUserMutation(payload).unwrap();
      form.reset();
      onClose();
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 2 }}>
        <InputLabel shrink htmlFor="email-input-invite" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
          אימייל
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
          תפקיד
        </InputLabel>
        <Select
          id="role-select-invite"
          label="תפקיד"
          {...form.register("role")}
          value={role}
          sx={{ mt: 0 }}
        >
          <MenuItem value={Role.TEAMLEADER}>ראש צוות</MenuItem>
          {hasTeamLeads && (
            <MenuItem value={Role.EMPLOYEE}>עובד</MenuItem>
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
          isLoadingTeamLeads={teamLeadsLoading}
        />
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, borderTop: `1px solid ${grey[200]}`, pt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || inviteLoading || teamLeadsLoading}
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
          {isSubmitting || inviteLoading ? <CircularProgress size={24} color="inherit" /> : "שלח הזמנה"}
        </Button>
      </Box>
    </form>
  );
};

export default InviteUserForm;