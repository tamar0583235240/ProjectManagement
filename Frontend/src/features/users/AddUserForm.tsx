import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../../schemas/SchemaAddUser";
import { TextField, Button, MenuItem, Alert } from "@mui/material";
import { useInviteUserMutation } from "../users/userApi";
import type { z } from "zod";
import { Role } from "../../enums/role.enum";
import SelectTeamLeader from "./SelectTeamLeader";
import { useMemo } from "react";
// import type { AddUserInputs } from "../../types/AddUserInputs";

type AddUserInputs = z.infer<typeof addUserSchema>;

interface AddUserFormProps {
  teamLeaders?: { id: string; name: string }[];
  organizationId: string;
}

const AddUserForm = () => {
  const currentManager = useMemo(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) return "";
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch {
      return "";
    }
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddUserInputs>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      role: Role.TEAM_LEADER,
    },
  });

  const role = watch("role");
  const [inviteUser, { isLoading, isError }] = useInviteUserMutation();
  co

  const onSubmit = async (data: AddUserInputs) => {
    const payload = {
      email: data.email,
      role: data.role, 
      manager_id: data.role === Role.EMPLOYEE ? data.team_leader_id :currentManager._id,
      organization_id:currentManager.organization_id,
    };

    console.log("Sending user data:", payload);

    try {
      await inviteUser(payload).unwrap();
      alert("ההזמנה נשלחה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה", error);
    }
  };

  const noTeamLeaders = !Array.isArray(teamLeaders) || teamLeaders.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="אימייל העובד"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="תפקיד"
            fullWidth
            margin="normal"
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value={Role.TEAM_LEADER}>ראש צוות</MenuItem>
            <MenuItem value={Role.EMPLOYEE}disabled={noTeamLeaders}>
              עובד {noTeamLeaders ? "(אין ראשי צוות זמינים)" : ""}
            </MenuItem>
          </TextField>
        )}
      />

      {role === Role.EMPLOYEE && noTeamLeaders && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          לא ניתן להוסיף עובד כיוון שאין ראשי צוות זמינים במערכת. אנא הוסף ראש צוות תחילה.
        </Alert>
      )}

      {role === Role.EMPLOYEE && !noTeamLeaders && (
        <SelectTeamLeader control={control} teamLeaders={teamLeaders} />
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading || (role === Role.EMPLOYEE && noTeamLeaders)}
      >
        שלח הזמנה
      </Button>

      {isError && (
        <p style={{ color: "red" }}>אירעה שגיאה בשליחת ההזמנה</p>
      )}
    </form>
  );
};

export default AddUserForm
