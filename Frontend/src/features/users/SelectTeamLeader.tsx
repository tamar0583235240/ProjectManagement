import { Controller } from "react-hook-form";
import { useGetTeamLeadersQuery } from "../../features/users/userApi";
import { TextField, MenuItem } from "@mui/material";

export const SelectTeamLeader = ({ control }: { control: any }) => {
  const { data: teamLeaders = [] } = useGetTeamLeadersQuery();

  return (
    <Controller
      name="teamLeaderId"
      control={control}
      render={({ field }) => (
        <TextField {...field} select label="בחר ראש צוות" fullWidth margin="normal">
          {teamLeaders.map((leader: any) => (
            <MenuItem key={leader._id} value={leader._id}>
              {leader.user_name}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
