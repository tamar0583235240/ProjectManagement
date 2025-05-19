import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { addUserSchema } from "../../schemas/SchemaAddUser";
import { useSignUpMutation } from "../../features/auth/authApi";
import { useGetTeamLeadersQuery } from "../../features/users/userApi"; // קריאת שרת
import { SelectTeamLeader } from "./SelectTeamLeader";
import type { AddUserInputs } from "../../types/AddUserInputs";
import { useMemo } from "react";

export const AddUserForm = () => {
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
      role: "team_leader",
    },
  });

  const role = watch("role");
  const [signUp, { isLoading, isError }] = useSignUpMutation();


  const {
    data: teamLeadersData = [],
    isLoading: isLoadingTeamLeaders,
    isError: isTeamLeadersError,
  } = useGetTeamLeadersQuery(currentManager._id, {
    skip: !currentManager, 
  });

  const teamLeaders = teamLeadersData.map((user) => ({
    id: user._id,
    name: user.user_name,
  }));

  const noTeamLeaders = teamLeaders.length === 0;

  const onSubmit = async (data: AddUserInputs) => {
    const finalData: AddUserInputs = {
      ...data,
      teamLeaderId:
        data.role === "team_leader" ? currentManager._id : data.teamLeaderId || "",
      organizationId: currentManager.organizationId,
    };

    try {
      await signUp(finalData).unwrap();
      alert("ההזמנה נשלחה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="אימייל העובד"
            type="email"
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
            <MenuItem value="team_leader">ראש צוות</MenuItem>
            <MenuItem value="employee" disabled={noTeamLeaders}>
              עובד {noTeamLeaders ? "(אין ראשי צוות זמינים)" : ""}
            </MenuItem>
          </TextField>
        )}
      />

      {role === "employee" && isLoadingTeamLeaders && (
        <CircularProgress size={24} sx={{ mt: 2 }} />
      )}

      {role === "employee" && isTeamLeadersError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          שגיאה בטעינת רשימת ראשי הצוות.
        </Alert>
      )}

      {role === "employee" && noTeamLeaders && !isLoadingTeamLeaders && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          לא ניתן להוסיף עובד כיוון שאין ראשי צוות זמינים. אנא הוסף ראש צוות תחילה.
        </Alert>
      )}

      {role === "employee" && !noTeamLeaders && (
        <SelectTeamLeader control={control} teamLeaders={teamLeaders} />
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading || (role === "employee" && noTeamLeaders)}
      >
        שלח הזמנה
      </Button>

      {isError && (
        <p style={{ color: "red" }}>אירעה שגיאה בשליחת ההזמנה</p>
      )}
    </form>
  );
};
