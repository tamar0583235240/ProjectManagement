// // import { useForm, Controller } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { addUserSchema } from "../../schemas/SchemaAddUser";
// // import { z } from "zod";
// // import { TextField, Button, MenuItem } from "@mui/material";
// // import { SelectTeamLeader } from "./SelectTeamLeader";
// // import { useAddUserMutation } from "../users/userApi";

// // type AddUserInputs = z.infer<typeof addUserSchema>;

// // export const AddUserForm = () => {
// //   const { control, handleSubmit, watch } = useForm<AddUserInputs>({
// //     resolver: zodResolver(addUserSchema),
// //     defaultValues: {
// //       email: "",
// //       role: "worker",
// //     },
// //   });

// //   const role = watch("role");
// //   const [addUser] = useAddUserMutation();

// //   const onSubmit = (data: AddUserInputs) => {
// //     addUser(data);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <Controller
// //         name="email"
// //         control={control}
// //         render={({ field }) => (
// //           <TextField {...field} label="אימייל העובד" fullWidth margin="normal" />
// //         )}
// //       />

// //       <Controller
// //         name="role"
// //         control={control}
// //         render={({ field }) => (
// //           <TextField {...field} select label="תפקיד" fullWidth margin="normal">
// //             <MenuItem value="team_leader">ראש צוות</MenuItem>
// //             <MenuItem value="worker">עובד</MenuItem>
// //           </TextField>
// //         )}
// //       />

// //       {role === "worker" && (
// //         <SelectTeamLeader control={control} />
// //       )}

// //       <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
// //         שלח הזמנה
// //       </Button>
// //     </form>
// //   );
// // };


// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { addUserSchema } from "../../schemas/SchemaAddUser";
// import { TextField, Button, MenuItem } from "@mui/material";
// import { SelectTeamLeader } from "./SelectTeamLeader";
// import { useAddUserMutation } from "../users/userApi";
// import type { z } from "zod";

// type AddUserInputs = z.infer<typeof addUserSchema>;

// export const AddUserForm = () => {
//   const {
//     control,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<AddUserInputs>({
//     resolver: zodResolver(addUserSchema),
//     defaultValues: {
//       email: "",
//       role: "employee",  // חייב להיות ערך חוקי מתוך ה-z.enum ["team_leader","employee"] — לפי הסכמה שלך צריך להיות "worker" או "employee"?
//     },
//   });

//   const role = watch("role");
//   const [addUser, { isLoading, isError }] = useAddUserMutation();

//   const onSubmit = async (data: AddUserInputs) => {
//     try {
//       await addUser(data).unwrap();
//       alert("ההזמנה נשלחה בהצלחה!");
//     } catch (error) {
//       console.error("שגיאה בשליחת ההזמנה", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} noValidate>
//       <Controller
//         name="email"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="אימייל העובד"
//             fullWidth
//             margin="normal"
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />
//         )}
//       />

//       <Controller
//         name="role"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             select
//             label="תפקיד"
//             fullWidth
//             margin="normal"
//             error={!!errors.role}
//             helperText={errors.role?.message}
//           >
//             <MenuItem value="team_leader">ראש צוות</MenuItem>
//             <MenuItem value="worker">עובד</MenuItem>
//           </TextField>
//         )}
//       />

//       {role === "employee" && <SelectTeamLeader control={control} />}

//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{ mt: 2 }}
//         disabled={isLoading}
//       >
//         שלח הזמנה
//       </Button>

//       {isError && <p style={{ color: "red" }}>אירעה שגיאה בשליחת ההזמנה</p>}
//     </form>
//   );
// };

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema } from "../../schemas/SchemaAddUser";
import { TextField, Button, MenuItem, Alert } from "@mui/material";
import { SelectTeamLeader } from "./SelectTeamLeader";
import { useAddUserMutation } from "../users/userApi";
import type { z } from "zod";

type AddUserInputs = z.infer<typeof addUserSchema>;

interface AddUserFormProps {
  teamLeaders?: { id: string; name: string }[]; // אופציונלי עם ?
}

export const AddUserForm = ({ teamLeaders = [] }: AddUserFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddUserInputs>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      role: "team_leader", // ברירת מחדל בטוחה
    },
  });

  const role = watch("role");
  const [addUser, { isLoading, isError }] = useAddUserMutation();

  const onSubmit = async (data: AddUserInputs) => {
    try {
      await addUser(data).unwrap();
      alert("ההזמנה נשלחה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשליחת ההזמנה", error);
    }
  };

  const noTeamLeaders = !Array.isArray(teamLeaders) || teamLeaders.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="אימייל העובד"
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

      {role === "employee" && noTeamLeaders && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          לא ניתן להוסיף עובד כיוון שאין ראשי צוות זמינים במערכת. אנא הוסף ראש צוות תחילה.
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
