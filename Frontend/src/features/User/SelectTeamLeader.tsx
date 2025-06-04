
import { Controller, type Control } from "react-hook-form";
import { MenuItem, TextField, CircularProgress } from "@mui/material";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetTeamLeadersQuery } from "./userApi";
interface SelectTeamLeaderProps {
  control: Control<any>;
}
const SelectTeamLeader = ({ control }: SelectTeamLeaderProps) => {
  const user = useCurrentUser();
  const userId = user?._id;

  const {
    data: teamLeads = [],
    isLoading,
    isError,
  } = useGetTeamLeadersQuery(userId!, {
    skip: !userId,
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>שגיאה בטעינת ראשי צוות</p>;

  return (
    <Controller
      name="teamLeadId"
      control={control}
      rules={{ required: "יש לבחור ראש צוות" }}
      render={({ field, fieldState }) => (
        <TextField
          select
          label="בחר ראש צוות"
          {...field}
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        >
          {teamLeads.map((lead) => (
            <MenuItem key={lead._id} value={lead._id}>
              {lead.user_name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default SelectTeamLeader;
