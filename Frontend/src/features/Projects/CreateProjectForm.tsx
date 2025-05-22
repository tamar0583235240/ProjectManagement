import React, { useState } from 'react';
import { projectSchema, ProjectFormData } from './projectSchema';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Card,
  CardContent,
  FormHelperText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Save as SaveIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { he } from 'date-fns/locale';

// הגדרת ערכת צבעים מותאמת לפי התמונה
const theme = {
  colors: {
    primary: '#00A4B4', // טורקיז
    secondary: '#F17C36', // כתום
    background: '#F5F7F9',
    cardBg: '#FFFFFF',
    text: '#333333',
    error: '#FF505F'
  }
}

// סטיילינג לכותרת
const StyledTitle = styled(Typography)(() => ({
  color: '#00A4B4',
  marginBottom: '1.5rem',
  fontWeight: 'bold',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    right: 0,
    margin: '0 auto',
    width: '80px',
    height: '4px',
    background: '#F17C36',
    borderRadius: '2px'
  }
}));

// סטיילינג לכפתור
const StyledButton = styled(Button)(() => ({
  backgroundColor: '#00A4B4',
  '&:hover': {
    backgroundColor: '#008C99',
  },
}));

const SecondaryButton = styled(Button)(() => ({
  backgroundColor: '#F17C36',
  '&:hover': {
    backgroundColor: '#D96B2B',
  },
}));

// Mock data for statuses and project managers
const statuses = [
  { _id: '1', status_name: 'פעיל' },
  { _id: '2', status_name: 'הוקפא' },
  { _id: '3', status_name: 'הסתיים' }
];

const projectManagers = [
  { _id: '1', user_name: 'דנה לוי' },
  { _id: '2', user_name: 'אבי כהן' },
  { _id: '3', user_name: 'רותי ישראלי' }
];

export default function CreateProjectForm() {
  // Form state
  const [formData, setFormData] = useState({
    project_name: '',
    description: '',
    start_date: new Date(),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // שבוע מהיום
    status: '',
    project_manager_id: '',
    organization_id: '123456789', // ערך קבוע
    authorized_Users: []
  });

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // User management for authorized users
  const [authorizedUsers, setAuthorizedUsers] = useState<Array<any>>([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: '', user_name: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle date changes
  const handleDateChange = (name: string, date: Date | null) => {
    if (date) {
      setFormData(prev => ({ ...prev, [name]: date }));
    }
  };

  // Open dialog to add/edit user
  const handleOpenUserDialog = (index: number | null = null) => {
    if (index !== null) {
      setCurrentUser(authorizedUsers[index]);
      setEditIndex(index);
    } else {
      setCurrentUser({ email: '', user_name: '' });
      setEditIndex(null);
    }
    setUserDialogOpen(true);
  };

  // Close user dialog
  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setCurrentUser({ email: '', user_name: '' });
  };

  // Add/Update authorized user
  const handleAddUser = () => {
    if (!currentUser.email || !currentUser.user_name) return;

    let updatedUsers = [...authorizedUsers];

    if (editIndex !== null) {
      updatedUsers[editIndex] = currentUser;
    } else {
      updatedUsers.push(currentUser);
    }

    setAuthorizedUsers(updatedUsers);
    setFormData(prev => ({ ...prev, authorized_Users: updatedUsers }));
    handleCloseUserDialog();
  };

  // Delete user from list
  const handleDeleteUser = (index: number) => {
    const updatedUsers = authorizedUsers.filter((_, i) => i !== index);
    setAuthorizedUsers(updatedUsers);
    setFormData(prev => ({ ...prev, authorized_Users: updatedUsers }));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate (in a real app, we'd use zod or similar)
      validateForm();
      console.log("Form data submitted:", formData);
      // Here you would typically call your API to save the data
      alert("הפרויקט נשמר בהצלחה!");

      // Reset form after successful submission
      setFormData({
        project_name: '',
        description: '',
        start_date: new Date(),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: '',
        project_manager_id: '',
        organization_id: '123456789',
        authorized_Users: []
      });
      setAuthorizedUsers([]);
      setErrors({});

    } catch (error) {
      // Errors are handled in validateForm()
      console.error(error);
    }
  };

  // Simple validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.project_name) {
      newErrors.project_name = "שם הפרויקט הוא שדה חובה";
    }

    if (!formData.description) {
      newErrors.description = "תיאור הפרויקט הוא שדה חובה";
    }

    if (!formData.status) {
      newErrors.status = "סטטוס הוא שדה חובה";
    }

    if (!formData.project_manager_id) {
      newErrors.project_manager_id = "מנהל פרויקט הוא שדה חובה";
    }

    if (formData.deadline <= new Date()) {
      newErrors.deadline = "תאריך היעד חייב להיות בעתיד";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      throw new Error("Validation failed");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: theme.colors.cardBg,
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <StyledTitle variant="h4" component="h1" align="center">
              הוספת פרויקט חדש
            </StyledTitle>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="שם הפרויקט"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleChange}
                  error={!!errors.project_name}
                  helperText={errors.project_name}
                  InputLabelProps={{ sx: { direction: 'rtl' } }}
                  sx={{ direction: 'rtl' }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="תיאור הפרויקט"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  multiline
                  rows={4}
                  InputLabelProps={{ sx: { direction: 'rtl' } }}
                  sx={{ direction: 'rtl' }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="תאריך התחלה"
                  value={formData.start_date}
                  onChange={(date) => handleDateChange('start_date', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.start_date,
                      helperText: errors.start_date,
                      InputLabelProps: { sx: { direction: 'rtl' } },
                      sx: { direction: 'rtl' }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="תאריך יעד"
                  value={formData.deadline}
                  onChange={(date) => handleDateChange('deadline', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.deadline,
                      helperText: errors.deadline,
                      InputLabelProps: { sx: { direction: 'rtl' } },
                      sx: { direction: 'rtl' }
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel id="status-label" sx={{ direction: 'rtl' }}>סטטוס</InputLabel>
                  <Select
                    labelId="status-label"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="סטטוס"
                    sx={{ direction: 'rtl', textAlign: 'right' }}
                  >
                    {statuses.map(status => (
                      <MenuItem key={status._id} value={status._id} sx={{ direction: 'rtl', textAlign: 'right' }}>
                        {status.status_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.project_manager_id}>
                  <InputLabel id="manager-label" sx={{ direction: 'rtl' }}>מנהל פרויקט</InputLabel>
                  <Select
                    labelId="manager-label"
                    name="project_manager_id"
                    value={formData.project_manager_id}
                    onChange={handleChange}
                    label="מנהל פרויקט"
                    sx={{ direction: 'rtl', textAlign: 'right' }}
                  >
                    {projectManagers.map(manager => (
                      <MenuItem key={manager._id} value={manager._id} sx={{ direction: 'rtl', textAlign: 'right' }}>
                        {manager.user_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.project_manager_id && <FormHelperText>{errors.project_manager_id}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            {/* Authorized Users Section */}
            <Box sx={{ mt: 5, mb: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h6" sx={{ color: theme.colors.primary, fontWeight: 'bold', direction: 'rtl' }}>
                    משתמשים מורשים
                  </Typography>
                </Grid>
                <Grid item>
                  <SecondaryButton
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleOpenUserDialog()}
                    sx={{ direction: 'rtl' }}
                  >
                    הוסף משתמש
                  </SecondaryButton>
                </Grid>
              </Grid>

              <Card 
                sx={{ 
                  mt: 2, 
                  border: 'none', 
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                  borderRadius: 2
                }}
              >
                {authorizedUsers.length > 0 ? (
                  <TableContainer component={Paper} elevation={0}>
                    <Table sx={{ minWidth: 500 }}>
                      <TableHead sx={{ backgroundColor: '#F5F7F9' }}>
                        <TableRow>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.colors.text }}>שם משתמש</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: theme.colors.text }}>אימייל</TableCell>
                          <TableCell align="center" sx={{ fontWeight: 'bold', color: theme.colors.text }}>פעולות</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {authorizedUsers.map((user, index) => (
                          <TableRow key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="right" sx={{ py: 2 }}>{user.user_name}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="עריכה"
                                size="small"
                                onClick={() => handleOpenUserDialog(index)}
                                sx={{ color: theme.colors.primary }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                aria-label="מחיקה"
                                size="small"
                                onClick={() => handleDeleteUser(index)}
                                sx={{ color: theme.colors.error }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="textSecondary">
                      לא נוספו משתמשים מורשים
                    </Typography>
                  </CardContent>
                )}
              </Card>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <StyledButton
                variant="contained"
                size="large"
                type="submit"
                startIcon={<SaveIcon />}
                sx={{ px: 5, py: 1, fontSize: '1.1rem' }}
              >
                שמירת פרויקט
              </StyledButton>
            </Box>
          </form>
        </Paper>
      </Container>

      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog} dir="rtl">
        <DialogTitle sx={{ 
            backgroundColor: theme.colors.primary, 
            color: 'white',
            fontSize: '1.2rem'
          }}
        >
          {editIndex !== null ? 'עריכת משתמש' : 'הוספת משתמש'}
        </DialogTitle>
        
        <DialogContent sx={{ pt: 4, pb: 2, px: 3, mt: 1 }}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם משתמש"
                value={currentUser.user_name}
                onChange={(e) => setCurrentUser({ ...currentUser, user_name: e.target.value })}
                variant="outlined"
                InputLabelProps={{ sx: { direction: 'rtl' } }}
                sx={{ direction: 'rtl' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="אימייל"
                type="email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                variant="outlined"
                InputLabelProps={{ sx: { direction: 'rtl' } }}
                sx={{ direction: 'rtl' }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseUserDialog} color="inherit" variant="outlined" sx={{ mr: 1 }}>
            ביטול
          </Button>
          <Button 
            onClick={handleAddUser} 
            color="primary" 
            variant="contained"
            sx={{ 
              backgroundColor: theme.colors.primary,
              '&:hover': {
                backgroundColor: '#008C99',
              }
            }}
          >
            {editIndex !== null ? 'עדכן' : 'הוסף'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}