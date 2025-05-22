
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteUserSchema } from "../../schemas/inviteUserSchema";
import { Button, MenuItem, TextField } from "@mui/material";
import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { z } from "zod";
import { SelectTeamLeader } from "./SelectTeamLeader";
type InviteUserInput = z.infer<typeof inviteUserSchema>;
const InviteUserForm = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("user", user);
  const { data: teamLeads = [] } = useGetTeamLeadersQuery(user._id);
  console.log("teamLeads", teamLeads);
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: "team_lead",
    },
  });
  const role = form.watch("role");
  const onSubmit = async (data: InviteUserInput) => {
  console.log("data", data);
    const payload: AddUserInputs = {
      ...data,
      managerId: data.role === "employee" ? data.teamLeadId : user._id,
      organizationId: user.organization,
    };
    try {
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
        <MenuItem value="team_lead">ראש צוות</MenuItem>
        {teamLeads.length > 0 && <MenuItem value="employee">עובד</MenuItem>}
      </TextField>
      {role === "employee" && teamLeads.length > 0 && (
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
