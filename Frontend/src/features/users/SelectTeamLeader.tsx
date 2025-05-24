
import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import type { Control } from "react-hook-form";
import { useGetTeamLeadersQuery } from "./userApi";
interface Props {
  control: Control<any>;
}
const user = JSON.parse(localStorage.getItem("user") || "{}");
export const SelectTeamLeader = ({ control }: Props) => {
  const { data: teamLeaders = [] } = useGetTeamLeadersQuery(user._id);
  return (
    <Controller
      name="teamLeadId"
      control={control}
      render={({ field }) => {
        return (
          <TextField
            {...field}
            select
            label="בחר ראש צוות"
            fullWidth
            margin="normal"
          >
            {teamLeaders.map((leader) => (
              <MenuItem key={leader.id} value={leader.id}>
                {leader.user_name}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};

export default SelectTeamLeader
