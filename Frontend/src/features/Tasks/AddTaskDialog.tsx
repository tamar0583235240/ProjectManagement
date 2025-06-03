// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
// } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import { Status } from '../../types/Status';
// import useCurrentUser from '../../hooks/useCurrentUser';
// import { useAddTaskMutation } from './tasksApi';



// type AddTaskDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   projectId: string;
// };

// type TaskFormValues = {
//   task_name: string;
//   description: string;
//   deadline: string;
//   status: Status;
//   performed_by: string;
// };

// const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
//   open,
//   onClose,
//   projectId,
// }) => {
//   const user = useCurrentUser();
//   const [addTask, { isLoading }] = useAddTaskMutation();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<TaskFormValues>({
//     defaultValues: {
//       task_name: '',
//       description: '',
//       deadline: '',
//       status: Status.NOT_STARTED,
//       performed_by: user?._id ?? '',
//     },
//   });

//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   const onSubmit = async (data: TaskFormValues) => {
//     try {
//       const newTask = {
//         task_name: data.task_name,
//         description: data.description,
//         deadline: new Date(data.deadline).toISOString(),
//         status: data.status,
//         project_id: projectId,
//         performed_by: data.performed_by || user?._id,
//         created_by: user?._id,
//       };

//       await addTask(newTask).unwrap();
//       handleClose();
//     } catch (error) {
//       console.error('Failed to create task:', error);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>Add New Task</DialogTitle>
//       <DialogContent>
//         <form id="add-task-form" onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name="task_name"
//             control={control}
//             rules={{ required: 'Task name is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Task Name"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.task_name}
//                 helperText={errors.task_name?.message}
//               />
//             )}
//           />
//           <Controller
//             name="description"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={3}
//               />
//             )}
//           />
//           <Controller
//             name="deadline"
//             control={control}
//             rules={{ required: 'Deadline is required' }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Deadline"
//                 type="date"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 error={!!errors.deadline}
//                 helperText={errors.deadline?.message}
//               />
//             )}
//           />
//           <Controller
//             name="status"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Status"
//                 select
//                 fullWidth
//                 margin="normal"
//               >
//                 {Object.values(Status).map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status.replace('_', ' ')}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             )}
//           />
//           <Controller
//             name="performed_by"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Performed By (User ID)"
//                 fullWidth
//                 margin="normal"
//                 disabled // או הסתר לגמרי אם תמיד זה user._id
//               />
//             )}
//           />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} disabled={isLoading}>
//           Cancel
//         </Button>
//         <Button
//           form="add-task-form"
//           type="submit"
//           variant="contained"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Saving...' : 'Add Task'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddTaskDialog;

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAddTaskMutation } from './tasksApi';
import useCurrentUser from '../../hooks/useCurrentUser';
import { useGetEmployeesByOrgQuery } from '../users/usersApi'; // דוגמה – שנה בהתאם למיקום שלך
import { Status } from '../../types/Status';

type AddTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  projectId: string;
};

type TaskFormValues = {
  task_name: string;
  description: string;
  deadline: string;
  performed_by: string;
};

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  onClose,
  projectId,
}) => {
  const user = useCurrentUser();
  const [addTask, { isLoading }] = useAddTaskMutation();
  const { data: employees = [], isLoading: isEmployeesLoading } =
    useGetEmployeesByOrgQuery(user?.organization_id!, {
      skip: !user?.organization_id,
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      task_name: '',
      description: '',
      deadline: '',
      performed_by: user?._id ?? '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: TaskFormValues) => {
    try {
      const newTask = {
        task_name: data.task_name,
        description: data.description,
        deadline: new Date(data.deadline).toISOString(),
        status: Status.NOT_STARTED, // לא מהטופס - קבוע
        project_id: projectId,
        performed_by: data.performed_by,
        created_by: user?._id,
      };

      await addTask(newTask).unwrap();
      handleClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form id="add-task-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="task_name"
            control={control}
            rules={{ required: 'Task name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task Name"
                fullWidth
                margin="normal"
                error={!!errors.task_name}
                helperText={errors.task_name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            )}
          />
          <Controller
            name="deadline"
            control={control}
            rules={{ required: 'Deadline is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
              />
            )}
          />

          <Controller
            name="performed_by"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assign To"
                select
                fullWidth
                margin="normal"
                disabled={isEmployeesLoading}
              >
                {employees.map((emp: any) => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.full_name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          form="add-task-form"
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
