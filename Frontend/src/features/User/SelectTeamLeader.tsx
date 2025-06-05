// import { Controller, type Control } from "react-hook-form";
// import { MenuItem, TextField, CircularProgress, Box, Typography } from "@mui/material";
// import type { InviteUserInput } from "../../schemas/inviteUserSchema";
// import type { User } from "../../types/User";

// interface SelectTeamLeaderProps {
//   control: Control<InviteUserInput>;
//   teamLeads: User[];
//   error: boolean;
//   helperText?: string;
//   isLoadingTeamLeads: boolean;
// }

// const SelectTeamLeader = ({ control, teamLeads, error, helperText, isLoadingTeamLeads }: SelectTeamLeaderProps) => {
//   if (isLoadingTeamLeads) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//         <CircularProgress />
//         <Typography ml={2}>טוען ראשי צוות...</Typography>
//       </Box>
//     );
//   }
//   if (teamLeads.length === 0) {
//     return (
//       <Typography color="error" sx={{ my: 2 }}>
//         אין ראשי צוות זמינים לבחירה.
//       </Typography>
//     );
//   }

//   return (
//     <Controller
//       name="teamLeadId"
//       control={control}
//       rules={{ required: "יש לבחור ראש צוות" }}
//       render={({ field, fieldState }) => (
//         <TextField
//           select 
//           label="בחר ראש צוות"
//           {...field} 
//           fullWidth
//           margin="normal"
//           error={error || !!fieldState.error}
//           helperText={helperText || fieldState.error?.message}
//         >
//           {teamLeads.map((lead) => (
//             <MenuItem key={lead._id} value={lead._id}>
//               {lead.user_name}
//             </MenuItem>
//           ))}
//         </TextField>
//       )}
//     />
//   );
// };

// export default SelectTeamLeader;

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
  if (teamLeads.length === 0) {
    return (
      <Typography color="error" sx={{ my: 2 }}>
        אין ראשי צוות זמינים לבחירה.
      </Typography>
    );
  }

  return (
    <Controller
      name="teamLeadId"
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          select
          label="בחר ראש צוות"
          {...field}
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
