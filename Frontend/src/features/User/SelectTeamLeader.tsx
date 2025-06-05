import { Controller, type Control } from "react-hook-form";
<<<<<<< HEAD:Frontend/src/features/User/SelectTeamLeader.tsx
import { MenuItem, TextField, CircularProgress } from "@mui/material";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetTeamLeadersQuery } from "./userApi";
=======
import { MenuItem, TextField, CircularProgress, Box, Typography } from "@mui/material";
import React from "react";
import type { InviteUserInput } from "../../schemas/inviteUserSchema";
import type { User } from "../../types/Project";


>>>>>>> Frontend/Employees:Frontend/src/features/users/SelectTeamLeader.tsx
interface SelectTeamLeaderProps {
  control: Control<InviteUserInput>;
  teamLeads: User[];
  error: boolean;
  helperText?: string;
  isLoadingTeamLeads: boolean;
}
<<<<<<< HEAD:Frontend/src/features/User/SelectTeamLeader.tsx
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
  if (isError) return <p>Error loading team leaders</p>;
=======

const SelectTeamLeader = ({ control, teamLeads, error, helperText, isLoadingTeamLeads }: SelectTeamLeaderProps) => {
  if (isLoadingTeamLeads) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress />
        <Typography ml={2}>טוען ראשי צוות...</Typography>
      </Box>
    );
  }

  if (teamLeads.length === 0) {
    return (
      <Typography color="error" sx={{ my: 2 }}>
        אין ראשי צוות זמינים לבחירה.
      </Typography>
    );
  }
>>>>>>> Frontend/Employees:Frontend/src/features/users/SelectTeamLeader.tsx

  return (
    <Controller
      name="teamLeadId" 
      control={control}
      rules={{ required: "A team leader must be chosen" }}
      render={({ field, fieldState }) => (
        <TextField
<<<<<<< HEAD:Frontend/src/features/User/SelectTeamLeader.tsx
          select
          label="Choose a team leader"
          {...field}
=======
          select 
          label="בחר ראש צוות"
          {...field} 
>>>>>>> Frontend/Employees:Frontend/src/features/users/SelectTeamLeader.tsx
          fullWidth
          margin="normal"
          error={error || !!fieldState.error}
          helperText={helperText || fieldState.error?.message}
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