
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MenuItem, TextField } from "@mui/material";
import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { z } from "zod";
import { inviteUserSchema } from "../../schemas/inviteUserSchema";
import { Role } from "../../enums/role.enum";
import useCurrentUser from "../../hooks/useCurrentUser";
import SelectTeamLeader from "./SelectTeamLeader";
type InviteUserInput = z.infer<typeof inviteUserSchema>;
const InviteUserForm = () => {
  const user = useCurrentUser();
  console.log("user",user);
  
const userId = user?._id;
const { data: teamLeads = [] } = useGetTeamLeadersQuery(userId, {
  skip: !userId,
});
  console.log("teamLeads", teamLeads);
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: Role.TEAM_LEADER,
    },
  });
  const role = form.watch("role");
  const onSubmit = async (data: InviteUserInput) => {    
    console.log("data", data);
    const payload: AddUserInputs = {
      ...data,
      managerId: data.role === Role.EMPLOYEE ? data.teamLeadId : user._id,
      organizationId: user.organization_id
      ,
    };
    console.log("payload", payload);
    try {
      console.log("HI");
      await inviteUser(payload).unwrap();
      form.reset();
    } catch (err) {
      console.error("שגיאה בשליחת ההזמנה:", err);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email"
        {...form.register("email")}
        fullWidth
        margin="normal"
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
      />
      <TextField
        select
        label="Role"
        {...form.register("role")}
        fullWidth
        margin="normal"
      />
      <MenuItem value={Role.TEAM_LEADER}>ראש צוות</MenuItem>
      {teamLeads.length > 0 && <MenuItem value={Role.EMPLOYEE}>עובד</MenuItem>}

      {role === Role.EMPLOYEE && teamLeads.length > 0 && (
        <SelectTeamLeader control={form.control} />
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        שלח הזמנה
      </Button>
    </form>
  );
};
export default InviteUserForm;
