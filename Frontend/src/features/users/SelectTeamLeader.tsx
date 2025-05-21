// // import { Controller } from "react-hook-form";
// // import { useGetTeamLeadersQuery } from "../../features/users/userApi";
// // import { TextField, MenuItem } from "@mui/material";

// // export const SelectTeamLeader = ({ control }: { control: any }) => {
// //   const { data: teamLeaders = [] } = useGetTeamLeadersQuery("123");

// //   return (
// //     <Controller
// //       name="teamLeaderId"
// //       control={control}
// //       render={({ field }) => (
// //         <TextField {...field} select label="בחר ראש צוות" fullWidth margin="normal">
// //           {teamLeaders.map((leader: any) => (
// //             <MenuItem key={leader._id} value={leader._id}>
// //               {leader.user_name}
// //             </MenuItem>
// //           ))}
// //         </TextField>
// //       )}
// //     />
// //   );
// // };
// import { Controller } from "react-hook-form";
// import { TextField, MenuItem } from "@mui/material";
// import type { Control } from "react-hook-form";

// interface Props {
//   control: Control<any>;
//   teamLeaders: { id: string; name: string }[];
// }

// export const SelectTeamLeader = ({ control, teamLeaders }: Props) => (
//   <Controller
//     name="teamLeaderId"
//     control={control}
//     render={({ field }) => (
//       <TextField
//         {...field}
//         select
//         label="בחר ראש צוות"
//         fullWidth
//         margin="normal"
//       >
//         {teamLeaders.map((leader) => (
//           <MenuItem key={leader.id} value={leader.id}>
//             {leader.name}
//           </MenuItem>
//         ))}
//       </TextField>
//     )}
//   />
// );



import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";
import type { Control } from "react-hook-form";



  interface Props {
  control: Control<any>;
 
}


export const SelectTeamLeader = ({ control }: Props) => {
  const { data: teamLeaders = [] } = useGetTeamLeadersQuery();

  return (
    <Controller
      name="teamLeaderId"
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
                {leader.name}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    />
  );
};

export default SelectTeamLeader
