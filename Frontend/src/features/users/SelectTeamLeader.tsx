
// import { Controller } from "react-hook-form";
// import { TextField, MenuItem } from "@mui/material";
// import type { Control } from "react-hook-form";
// import { useGetTeamLeadersQuery } from "./userApi";
// import useCurrentUser from "../../hooks/useCurrentUser";
// interface Props {
//   control: Control<any>;
// }

// const SelectTeamLeader = ({ control }: Props) => {
//   const user = useCurrentUser();
//   const { data: teamLeaders = [] } = useGetTeamLeadersQuery(user._id);
//   return (
//     <Controller
//       name="teamLeadId"
//       control={control}
//       render={({ field }) => {
//         return (
//           <TextField
//             {...field}
//             select
//             label="בחר ראש צוות"
//             fullWidth
//             margin="normal"
//           >
//             {teamLeaders.map((leader) => (
//               <MenuItem key={leader.id} value={leader.id}>
//                 {leader.user_name}
//               </MenuItem>
//             ))}
//           </TextField>
//         );
//       }}
//     />
//   );
// };

// export default SelectTeamLeader


// import React from "react";
import { Controller,type Control } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { useGetTeamLeadersQuery } from "./userApi";
import useCurrentUser from "../../hooks/useCurrentUser";
// import { useGetTeamLeadersQuery } from "../api/hook"; // נתיב לדאטה פETCH שלך

interface SelectTeamLeaderProps {
  control: Control<any>;
}
  const user = useCurrentUser();

const SelectTeamLeader: React.FC<SelectTeamLeaderProps> = ({ control }) => {
  const { data: teamLeads = [] } = useGetTeamLeadersQuery(user._id);

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
