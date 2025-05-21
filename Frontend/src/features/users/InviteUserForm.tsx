// // // // // import { useForm, Controller } from "react-hook-form";
// // // // // import { zodResolver } from "@hookform/resolvers/zod";
// // // // // import { addUserSchema } from "../../schemas/inviteUserSchema";
// // // // // import { TextField, Button, MenuItem, Alert } from "@mui/material";
// // // // // import { useGetTeamLeadersQuery, useInviteUserMutation } from "./userApi";
// // // // // import type { z } from "zod";
// // // // // import { Role } from "../../enums/role.enum";
// // // // // import SelectTeamLeader from "./SelectTeamLeader";
// // // // // import { useMemo } from "react";

// // // // // type AddUserInputs = z.infer<typeof addUserSchema>;

// // // // // const AddUserForm = () => {
// // // // //   const currentManager = useMemo(() => {
// // // // //     const userStr = localStorage.getItem("currentUser");
// // // // //     if (!userStr) return "";
// // // // //     try {
// // // // //       const user = JSON.parse(userStr);
// // // // //       return user;
// // // // //     } catch {
// // // // //       return "";
// // // // //     }
// // // // //   }, []);

// // // // //   const {
// // // // //     control,
// // // // //     handleSubmit,
// // // // //     watch,
// // // // //     formState: { errors },
// // // // //   } = useForm<AddUserInputs>({
// // // // //     resolver: zodResolver(addUserSchema),
// // // // //     defaultValues: {
// // // // //       email: "",
// // // // //       role: Role.TEAM_LEADER,
// // // // //     },
// // // // //   });

// // // // //   const role = watch("role");
// // // // //   const [inviteUser, { isLoading, isError }] = useInviteUserMutation();
// // // // //   const GetTeamLeaders = useGetTeamLeadersQuery(currentManager._id);

// // // // //   const onSubmit = async (data: AddUserInputs) => {
// // // // //     const payload = {
// // // // //       email: data.email,
// // // // //       role: data.role, 
// // // // //       manager_id: data.role === Role.EMPLOYEE ? data.team_leader_id :currentManager._id,
// // // // //       organization_id:currentManager.organization_id,
// // // // //     };

// // // // //     console.log("Sending user data:", payload);

// // // // //     try {
// // // // //       await inviteUser(payload).unwrap();
// // // // //       alert("ההזמנה נשלחה בהצלחה!");
// // // // //     } catch (error) {
// // // // //       console.error("שגיאה בשליחת ההזמנה", error);
// // // // //     }
// // // // //   };

// // // // //   const noTeamLeaders = !Array.isArray(GetTeamLeaders) || GetTeamLeaders.length === 0;

// // // // //   return (
// // // // //     <form onSubmit={handleSubmit(onSubmit)} noValidate>
// // // // //       <Controller
// // // // //         name="email"
// // // // //         control={control}
// // // // //         render={({ field }) => (
// // // // //           <TextField
// // // // //             {...field}
// // // // //             label="אימייל העובד"
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //             error={!!errors.email}
// // // // //             helperText={errors.email?.message}
// // // // //           />
// // // // //         )}
// // // // //       />

// // // // //       <Controller
// // // // //         name="role"
// // // // //         control={control}
// // // // //         render={({ field }) => (
// // // // //           <TextField
// // // // //             {...field}
// // // // //             select
// // // // //             label="תפקיד"
// // // // //             fullWidth
// // // // //             margin="normal"
// // // // //             error={!!errors.role}
// // // // //             helperText={errors.role?.message}
// // // // //           >
// // // // //             <MenuItem value={Role.TEAM_LEADER}>ראש צוות</MenuItem>
// // // // //             <MenuItem value={Role.EMPLOYEE}disabled={noTeamLeaders}>
// // // // //               עובד {noTeamLeaders ? "(אין ראשי צוות זמינים)" : ""}
// // // // //             </MenuItem>
// // // // //           </TextField>
// // // // //         )}
// // // // //       />

// // // // //       {role === Role.EMPLOYEE && noTeamLeaders && (
// // // // //         <Alert severity="warning" sx={{ mt: 2 }}>
// // // // //           לא ניתן להוסיף עובד כיוון שאין ראשי צוות זמינים במערכת. אנא הוסף ראש צוות תחילה.
// // // // //         </Alert>
// // // // //       )}

// // // // //       {role === Role.EMPLOYEE && !noTeamLeaders && (
// // // // //         <SelectTeamLeader control={control} teamLeaders={teamLeaders} />
// // // // //       )}

// // // // //       <Button
// // // // //         type="submit"
// // // // //         variant="contained"
// // // // //         fullWidth
// // // // //         sx={{ mt: 2 }}
// // // // //         disabled={isLoading || (role === Role.EMPLOYEE && noTeamLeaders)}
// // // // //       >
// // // // //         שלח הזמנה
// // // // //       </Button>

// // // // //       {isError && (
// // // // //         <p style={{ color: "red" }}>אירעה שגיאה בשליחת ההזמנה</p>
// // // // //       )}
// // // // //     </form>
// // // // //   );
// // // // // };

// // // // // export default AddUserForm

// // // // // src/features/users/forms/InviteUserForm.tsx


// // // // import { useForm } from 'react-hook-form';
// // // // import { zodResolver } from '@hookform/resolvers/zod';
// // // // import { inviteUserSchema } from '../../schemas/inviteUserSchema';
// // // // import { z } from 'zod';
// // // // import { Button, MenuItem, TextField } from '@mui/material';
// // // // import { useGetTeamLeadersQuery, useInviteUserMutation } from '../users/userApi';
// // // // // import { useGetTeamLeadsQuery } from '../users/userApi';

// // // // type InviteUserInput = z.infer<typeof inviteUserSchema>;

// // // // export const InviteUserForm = ({ managerId }: { managerId: string }) => {
// // // //   const form = useForm<InviteUserInput>({
// // // //     resolver: zodResolver(inviteUserSchema),
// // // //     defaultValues: {
// // // //       role: 'team_lead',
// // // //     },
// // // //   });

// // // //   const { data: teamLeads } = useGetTeamLeadersQuery(managerId);
// // // //   const [inviteUser] = useInviteUserMutation();

// // // //   const role = form.watch('role');

// // // //   const onSubmit = (data: InviteUserInput) => {
// // // //     if (data.role === 'employee' && !data.teamLeadId) return;
// // // //     inviteUser({ ...data, managerId });
// // // //   };

// // // //   return (
// // // //     <form onSubmit={form.handleSubmit(onSubmit)}>
// // // //       <TextField
// // // //         label="Email"
// // // //         {...form.register('email')}
// // // //         fullWidth
// // // //         margin="normal"
// // // //       />
// // // //       <TextField
// // // //         select
// // // //         label="Role"
// // // //         {...form.register('role')}
// // // //         fullWidth
// // // //         margin="normal"
// // // //       >
// // // //         <MenuItem value="team_lead">ראש צוות</MenuItem>
// // // //         <MenuItem value="employee">עובד</MenuItem>
// // // //       </TextField>

// // // //       {role === 'employee' && (
// // // //         <TextField
// // // //           select
// // // //           label="ראש צוות"
// // // //           {...form.register('teamLeadId')}
// // // //           fullWidth
// // // //           margin="normal"
// // // //         >
// // // //           {teamLeads?.map((lead) => (
// // // //             <MenuItem key={lead._id} value={lead._id}>
// // // //               {lead.name}
// // // //             </MenuItem>
// // // //           ))}
// // // //         </TextField>
// // // //       )}

// // // //       <Button type="submit" variant="contained" color="primary">
// // // //         שלח הזמנה
// // // //       </Button>
// // // //     </form>
// // // //   );
// // // // };
// // // import { useForm } from 'react-hook-form';
// // // import { zodResolver } from '@hookform/resolvers/zod';
// // // import { inviteUserSchema } from '../../schemas/inviteUserSchema';
// // // import { z } from 'zod';
// // // import { Button, MenuItem, TextField } from '@mui/material';
// // // import { useInviteUserMutation, useGetTeamLeadersQuery } from '../users/userApi';
// // // import type { AddUserInputs } from '../../types/AddUserInputs';
// // // // import type { AddUserInputs } from '../../types/AddUserInputs';
// // // type InviteUserInput = z.infer<typeof inviteUserSchema>;
// // // export const InviteUserForm = () => {
// // //   // חילוץ המשתמש מה-localStorage
// // //   const user = JSON.parse(localStorage.getItem('user') || '{}');
// // //   const form = useForm<InviteUserInput>({
// // //     resolver: zodResolver(inviteUserSchema),
// // //     defaultValues: {
// // //       role: 'team_lead',
// // //     },
// // //   });
// // //   const role = form.watch('role');
// // //   // קריאת ראשי הצוותים לפי ID של המנהל הנוכחי
// // //   const { data: teamLeads } = useGetTeamLeadersQuery(user._id);
// // //   const [inviteUser] = useInviteUserMutation();

// // //   // שליחה של ההזמנה
// // //   const onSubmit = (data: InviteUserInput) => {
// // //     if (data.role === 'employee' && !data.teamLeadId) {
// // //       alert('יש לבחור ראש צוות עבור עובד');
// // //       return;
// // //     }
    
  
// // //     const payload: AddUserInputs = {
// // //       ...data,
// // //       managerId: data.role === 'employee' ? data.teamLeaderId : user._id,
// // //       organizationId: user.organization,
// // //     };
    
// // //     inviteUser(payload);
// // //   };

// // //   return (
// // //     <form onSubmit={form.handleSubmit(onSubmit)}>
// // //       <TextField
// // //         label="Email"
// // //         {...form.register('email')}
// // //         fullWidth
// // //         margin="normal"
// // //       />

// // //       <TextField
// // //         select
// // //         label="Role"
// // //         {...form.register('role')}
// // //         fullWidth
// // //         margin="normal"
// // //       >
// // //         <MenuItem value="team_lead">ראש צוות</MenuItem>
// // //         <MenuItem value="employee">עובד</MenuItem>
// // //       </TextField>

// // //       {role === 'employee' && (
// // //         <TextField
// // //           select
// // //           label="ראש צוות"
// // //           {...form.register('teamLeadId')}
// // //           fullWidth
// // //           margin="normal"
// // //         >
// // //           {teamLeads?.length ? (
// // //             teamLeads.map((lead) => (
// // //               <MenuItem key={lead._id} value={lead._id}>
// // //                 {lead.name}
// // //               </MenuItem>
// // //             ))
// // //           ) : (
// // //             <MenuItem disabled>אין ראשי צוות זמינים</MenuItem>
// // //           )}
// // //         </TextField>
// // //       )}

// // //       <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
// // //         שלח הזמנה
// // //       </Button>
// // //     </form>
// // //   );
// // // };
// // // import { useForm } from "react-hook-form";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // import { inviteUserSchema } from "../../schemas/inviteUserSchema";
// // // import { Button, MenuItem, TextField } from "@mui/material";
// // // import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
// // // import type { AddUserInputs } from "../../types/AddUserInputs";
// // // import type { z } from "zod";

// // // type InviteUserInput = z.infer<typeof inviteUserSchema>;

// // //  const InviteUserForm = () => {
// // //   const user = JSON.parse(localStorage.getItem("user") || "{}");
// // //   const { data: teamLeads } = useGetTeamLeadersQuery(user._id);
// // //   const [inviteUser, { isLoading }] = useInviteUserMutation();

// // //   const form = useForm<InviteUserInput>({
// // //     resolver: zodResolver(inviteUserSchema),
// // //     defaultValues: {
// // //       role: "team_lead",
// // //     },
// // //   });

// // //   const role = form.watch("role");

// // //   const onSubmit = (data: InviteUserInput) => {
// // //     const payload: AddUserInputs = {
// // //       ...data,
// // //       managerId: data.role === "employee" ? data.teamLeadId : user._id,
// // //       organizationId: user.organization,
// // //     };

// // //     inviteUser(payload);
// // //   };

// // //   return (
// // //     <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
// // //       <TextField
// // //         label="Email"
// // //         {...form.register("email")}
// // //         fullWidth
// // //         margin="normal"
// // //         error={!!form.formState.errors.email}
// // //         helperText={form.formState.errors.email?.message}
// // //       />

// // //       <TextField
// // //         select
// // //         label="Role"
// // //         {...form.register("role")}
// // //         fullWidth
// // //         margin="normal"
// // //       >
// // //         <MenuItem value="team_lead">ראש צוות</MenuItem>
// // //         <MenuItem value="employee">עובד</MenuItem>
// // //       </TextField>

// // //       {role === "employee" && (
// // //         <TextField
// // //           select
// // //           label="ראש צוות"
// // //           {...form.register("teamLeadId")}
// // //           fullWidth
// // //           margin="normal"
// // //           error={!!form.formState.errors.teamLeadId}
// // //           helperText={form.formState.errors.teamLeadId?.message}
// // //         >
// // //           {teamLeads?.length ? (
// // //             teamLeads.map((lead) => (
// // //               <MenuItem key={lead._id} value={lead._id}>
// // //                 {lead.user_name}
// // //               </MenuItem>
// // //             ))
// // //           ) : (
// // //             <MenuItem disabled>אין ראשי צוות זמינים</MenuItem>
// // //           )}
// // //         </TextField>
// // //       )}

// // //       <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
// // //         שלח הזמנה
// // //       </Button>
// // //     </form>
// // //   );
// // // };
// // // export default InviteUserForm;


// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { inviteUserSchema } from "../../schemas/inviteUserSchema";
// // import { Button, MenuItem, TextField } from "@mui/material";
// // import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
// // import type { AddUserInputs } from "../../types/AddUserInputs";
// // import type { z } from "zod";

// // type InviteUserInput = z.infer<typeof inviteUserSchema>;

// // const InviteUserForm = () => {
// //   const user = JSON.parse(localStorage.getItem("user") || "{}");
// //   const { data: teamLeads } = useGetTeamLeadersQuery(user._id);
// //   const [inviteUser, { isLoading }] = useInviteUserMutation();

// //   const hasTeamLeads = teamLeads && teamLeads.length > 0;

// //   const form = useForm<InviteUserInput>({
// //     resolver: zodResolver(inviteUserSchema),
// //     defaultValues: {
// //       role: "team_lead", // ברירת מחדל
// //     },
// //   });

// //   const role = form.watch("role");

// //   const onSubmit = (data: InviteUserInput) => {
// //     const payload: AddUserInputs = {
// //       ...data,
// //       managerId: data.role === "employee" ? data.teamLeadId : user._id,
// //       organizationId: user.organization,
// //     };

// //     inviteUser(payload);
// //   };

// //   return (
// //     <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
// //       <TextField
// //         label="Email"
// //         {...form.register("email")}
// //         fullWidth
// //         margin="normal"
// //         error={!!form.formState.errors.email}
// //         helperText={form.formState.errors.email?.message}
// //       />

// //       <TextField
// //         select
// //         label="Role"
// //         {...form.register("role")}
// //         fullWidth
// //         margin="normal"
// //       >
// //         <MenuItem value="team_lead">ראש צוות</MenuItem>
// //         {hasTeamLeads && <MenuItem value="employee">עובד</MenuItem>}
// //       </TextField>

// //       {role === "employee" && hasTeamLeads && (
// //         <TextField
// //           select
// //           label="ראש צוות"
// //           {...form.register("teamLeadId")}
// //           fullWidth
// //           margin="normal"
// //           error={!!form.formState.errors.teamLeadId}
// //           helperText={form.formState.errors.teamLeadId?.message}
// //         >
// //           {teamLeads.map((lead) => (
// //             <MenuItem key={lead._id} value={lead._id}>
// //               {lead.user_name}
// //             </MenuItem>
// //           ))}
// //         </TextField>
// //       )}

// //       <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
// //         שלח הזמנה
// //       </Button>
// //     </form>
// //   );
// // };

// // export default InviteUserForm;
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { inviteUserSchema } from "../../schemas/inviteUserSchema";
// import { Button, MenuItem, TextField } from "@mui/material";
// import { useInviteUserMutation } from "../users/userApi";
// import { SelectTeamLeader } from "./SelectTeamLeader"; // ✅ ייבוא הקומפוננטה החדשה
// import type { AddUserInputs } from "../../types/AddUserInputs";
// import type { z } from "zod";

// type InviteUserInput = z.infer<typeof inviteUserSchema>;

// const InviteUserForm = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const [inviteUser, { isLoading }] = useInviteUserMutation();

//   const form = useForm<InviteUserInput>({
//     resolver: zodResolver(inviteUserSchema),
//     defaultValues: {
//       role: "team_lead", // ברירת מחדל
//     },
//   });

//   const role = form.watch("role");

//   const onSubmit = (data: InviteUserInput) => {
//     const payload: AddUserInputs = {
//       ...data,
//       managerId: data.role === "employee" ? data.teamLeadId : user._id,
//       organizationId: user.organization,
//     };

//     inviteUser(payload);
//   };

//   return (
//     <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
//       <TextField
//         label="Email"
//         {...form.register("email")}
//         fullWidth
//         margin="normal"
//         error={!!form.formState.errors.email}
//         helperText={form.formState.errors.email?.message}
//       />

//       <TextField
//         select
//         label="Role"
//         {...form.register("role")}
//         fullWidth
//         margin="normal"
//       >
//         <MenuItem value="team_lead">ראש צוות</MenuItem>
//         <MenuItem value="employee">עובד</MenuItem>
//       </TextField>

//       {/* ✅ כאן הכנסנו את הקומפוננטה אם בוחרים "עובד" */}
//       {role === "employee" && <SelectTeamLeader control={form.control} />}

//       <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
//         שלח הזמנה
//       </Button>
//     </form>
//   );
// };

// export default InviteUserForm;




import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteUserSchema } from "../../schemas/inviteUserSchema";
import { Button, MenuItem, TextField } from "@mui/material";
import { useInviteUserMutation, useGetTeamLeadersQuery } from "../users/userApi";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { z } from "zod";
import { SelectTeamLeader } from "./SelectTeamLeader";

type InviteUserInput = z.infer<typeof inviteUserSchema>;

const InviteUserForm = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data: teamLeads = [] } = useGetTeamLeadersQuery(user._id);
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const form = useForm<InviteUserInput>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      role: "team_lead",
    },
  });

  const role = form.watch("role");

  const onSubmit = async (data: InviteUserInput) => {
    const payload: AddUserInputs = {
      ...data,
      managerId: data.role === "employee" ? data.teamLeadId : user._id,
      organizationId: user.organization,
    };
    try {
      await inviteUser(payload).unwrap();
      // אפשר להוסיף הודעת הצלחה או ניקוי טופס
    } catch (err) {
      // הצגת שגיאה למשתמש
      console.error("שגיאה בשליחת ההזמנה:", err);
    }
    
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email"
        {...form.register("email")}
        fullWidth
        margin="normal"
        error={!!form.formState.errors.email}
        helperText={form.formState.errors.email?.message}
      />

      <TextField
        select
        label="Role"
        {...form.register("role")}
        fullWidth
        margin="normal"
      >
        <MenuItem value="team_lead">ראש צוות</MenuItem>
        {teamLeads.length > 0 && <MenuItem value="employee">עובד</MenuItem>}
      </TextField>

      {role === "employee" && teamLeads.length > 0 && (
        <SelectTeamLeader control={form.control} />
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
      >
        שלח הזמנה
      </Button>
    </form>
  );
};

export default InviteUserForm;
