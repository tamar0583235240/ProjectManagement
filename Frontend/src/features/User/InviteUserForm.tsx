
// import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MenuItem, TextField } from "@mui/material";
import useCurrentUser from "../../hooks/useCurrentUser";
import { inviteUserSchema, type InviteUserInput } from "../../schemas/inviteUserSchema";
import { useGetTeamLeadersQuery, useInviteUserMutation } from "./userApi";
import SelectTeamLeader from "./SelectTeamLeader";
import { Role } from "../../types/Role";
const InviteUserForm: React.FC = () => {
  const user = useCurrentUser();
  const userId = user?._id;

  const { data: teamLeads = [] } = useGetTeamLeadersQuery(userId, {
    skip: !userId,
  });
  const hasTeamLeads = teamLeads.length > 0;

  const [inviteUser, { isLoading }] = useInviteUserMutation();

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
      await inviteUser(payload).unwrap();
      form.reset();
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <TextField
        label="אימייל"
        {...form.register("email")}
        fullWidth
        margin="normal"
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
      />

      <TextField select label="תפקיד" {...form.register("role")} fullWidth margin="normal">
        {!hasTeamLeads && <MenuItem value={Role.TEAMLEADER}>ראש צוות</MenuItem>}
        {hasTeamLeads && (
          <>
            <MenuItem value={Role.TEAMLEADER}>ראש צוות</MenuItem>
            <MenuItem value={Role.EMPLOYEE}>עובד</MenuItem>
          </>
        )}
      </TextField>

      {role === Role.EMPLOYEE && hasTeamLeads && <SelectTeamLeader control={form.control} />}

      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        שלח הזמנה
      </Button>
    </form>
  );
};

export default InviteUserForm;

