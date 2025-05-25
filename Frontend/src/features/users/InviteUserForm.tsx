
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { inviteUserSchema } from "../../schemas/inviteUserSchema";
import { Button, MenuItem, TextField } from "@mui/material";
import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { z } from "zod";
// import { SelectTeamLeader } from "./SelectTeamLeader";
import { inviteUserSchema } from "../../schemas/inviteUserSchema";
import { Role } from "../../enums/role.enum";
import useCurrentUser from "../../hooks/useCurrentUser";
import SelectTeamLeader from "./SelectTeamLeader";
type InviteUserInput = z.infer<typeof inviteUserSchema>;
const InviteUserForm = () => {
  const user = useCurrentUser();
  console.log("user", user);
  const { data: teamLeads = [] } = useGetTeamLeadersQuery(user._id);
  console.log("teamLeads", teamLeads);
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: Role.TEAM_LEADER, // ברירת מחדל לראש צוות
    },
  });
  const role = form.watch("role");
  const onSubmit = async (data: InviteUserInput) => {    
    console.log("data", data);
    const payload: AddUserInputs = {
      ...data,
      manager_id: data.role === Role.EMPLOYEE ? data.teamLeadId : user._id,
      organization_id: user.organization_id
      ,
    };
    console.log("payload", payload);
    try {
      console.log("HI");
      await inviteUser(payload).unwrap();
      // אפשר להוסיף הודעת הצלחה או ניקוי טופס
    } catch (err) {
      // הצגת שגיאה למשתמש
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
      >
        <MenuItem value="TEAM_LEADER">ראש צוות</MenuItem>
        {teamLeads.length > 0 && <MenuItem value="EMPLOYEE">עובד</MenuItem>}
      </TextField>
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
