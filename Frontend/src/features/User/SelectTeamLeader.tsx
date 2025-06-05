import { Controller, type Control } from "react-hook-form";
import { MenuItem, TextField, CircularProgress, Box, Typography } from "@mui/material";
import type { InviteUserInput } from "../../schemas/inviteUserSchema";
import type { User } from "../../types/User";

interface SelectTeamLeaderProps {
  control: Control<InviteUserInput>;
  teamLeads: User[];
  error: boolean;
  helperText?: string;
  isLoadingTeamLeads: boolean;
}

const SelectTeamLeader = ({ control, teamLeads, error, helperText, isLoadingTeamLeads }: SelectTeamLeaderProps) => {
  if (isLoadingTeamLeads) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress />
        <Typography ml={2}>טוען ראשי צוות...</Typography>
      </Box>
    );
  }

  // זו הגנה, אבל הלוגיקה ב-InviteUserForm אמורה למנוע רינדור של זה אם אין ראשי צוות.
  if (teamLeads.length === 0) {
    return (
      <Typography color="error" sx={{ my: 2 }}>
        אין ראשי צוות זמינים לבחירה.
      </Typography>
    );
  }

  return (
    <Controller
      name="teamLeadId" // השדה ש-React Hook Form ינהל
      control={control}
      rules={{ required: "יש לבחור ראש צוות" }}
      render={({ field, fieldState }) => (
        <TextField
          select // זה חשוב כדי שה-TextField יתנהג כסלקט
          label="בחר ראש צוות"
          {...field} // מקשר את השדה ל-React Hook Form (value, onChange, onBlur)
          fullWidth
          margin="normal"
          error={error || !!fieldState.error}
          helperText={helperText || fieldState.error?.message}
        >
          {/* לולאה על מערך teamLeads שקיבלנו בפרופס */}
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