// import useCurrentUser from "../hooks/useCurrentUser";
// import useInitialize from "../hooks/useInitialize";
// const HomePage = () => {
//   const user = useCurrentUser();
//   useInitialize();
//   return ( 
//     <div>
//       <h1>hello {user.user_name}</h1>
//     </div>
//   )
// }

// export default HomePage;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useInitialize from '../hooks/useInitialize';
import {
  Typography,
  Paper,
  Grid,
  Box,
  useTheme,
  styled,
  CircularProgress,
  Alert,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // איקון למשתמש
import BusinessIcon from '@mui/icons-material/Business'; // איקון לארגון
import AssignmentIcon from '@mui/icons-material/Assignment'; // איקון למשימות
import WorkIcon from '@mui/icons-material/Work'; // איקון לפרויקטים
import BarChartIcon from '@mui/icons-material/BarChart'; // איקון לסטטיסטיקה

import {
  selectCurrentUser,
  selectCurrentUserOrganization,
  selectUserIsLoading,
  selectUserError,
} from '../features/auth/userSlice';
import useCurrentUser from '../hooks/useCurrentUser';

// רכיב עזר מעוצב עבור כרטיסי המידע
const StyledItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // שימוש בצבע הרקע של ה-Paper מה-Theme
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '100%', // כדי שכל הפריטים באותו גובה
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3], // הוספת צל קל מתוך ה-Theme
  borderRadius: theme.shape.borderRadius, // שימוש ברדיוס הפינות מה-Theme
  transition: 'transform 0.2s ease-in-out', // אנימציית ריחוף
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const HomePage = () => {
  const user = useCurrentUser();
  const organization = useSelector(selectCurrentUserOrganization);


  const theme = useTheme();
  const [greeting, setGreeting] = useState('');

  // קוראים ל-hook כדי לאתחל את הנתונים ב-Redux store
  useInitialize();

  // אפקט לקביעת ברכת בוקר/צהריים/ערב
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('בוקר טוב');
    } else if (currentHour < 18) {
      setGreeting('צהריים טובים');
    } else {
      setGreeting('ערב טוב');
    }
  }, []);

  // מצבי טעינה ושגיאה
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
        <Typography variant="h6" sx={{ ml: 2, color: theme.palette.text.secondary }}>טוען פרטי משתמש וארגון...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: theme.spacing(3) }}>
        <Alert severity="error" sx={{ backgroundColor: theme.palette.error.light, color: theme.palette.error.dark }}>
          <Typography variant="h6">שגיאה בטעינת הנתונים:</Typography>
          <Typography variant="body1">{error}</Typography>
          <Typography variant="body2">אנא נסה לרענן את הדף או פנה לתמיכה.</Typography>
        </Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ padding: theme.spacing(3) }}>
        <Alert severity="warning" sx={{ backgroundColor: theme.palette.warning.light, color: theme.palette.warning.dark }}>
          <Typography variant="h6">המשתמש אינו מחובר או פרטיו אינם זמינים.</Typography>
          <Typography variant="body1">אנא התחבר כדי לצפות בפרטי דף הבית.</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: theme.spacing(3), backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: theme.typography.h4.fontWeight }}>
        {greeting}, {user.user_name}!
      </Typography>

      <Grid container spacing={3}>
        {/* כרטיס פרטים אישיים */}
        <Grid item xs={12} md={6}>
          <StyledItem>
            <Box>
              <AccountCircleIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                פרטים אישיים
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                **שם משתמש:** {user.user_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                **דוא"ל:** {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                **תפקיד:** {user.role || 'לא זמין'}
              </Typography>
              {user.phone && (
                <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                  **טלפון:** {user.phone}
                </Typography>
              )}
            </Box>
          </StyledItem>
        </Grid>

        {/* כרטיס פרטי הארגון */}
        <Grid item xs={12} md={6}>
          <StyledItem>
            <Box>
              <BusinessIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                פרטי הארגון
              </Typography>
              {organization ? (
                <>
                  <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                    **שם הארגון:** {organization.organization_name}
                  </Typography>
                  {organization.organization_address && (
                    <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                      **כתובת:** {organization.organization_address}
                    </Typography>
                  )}
                  {organization.organization_phone && (
                    <Typography variant="body1" sx={{ mb: 1, textAlign: 'right' }}>
                      **טלפון:** {organization.organization_phone}
                    </Typography>
                  )}
                
                </>
              ) : (
                <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'right' }}>
                  פרטי הארגון אינם זמינים כרגע.
                </Typography>
              )}
            </Box>
          </StyledItem>
        </Grid>

        {/* רעיונות נוספים לשדרוג הדף - דוגמאות לשימוש בנתונים נוספים */}

        {/* כרטיס משימות אחרונות (דוגמה לשימוש בנתונים מדומים/חיים) */}
        <Grid item xs={12} md={4}>
          <StyledItem>
            <Box>
              <AssignmentIcon sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                משימות אחרונות
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, textAlign: 'right' }}>
                הצג כאן רשימה של המשימות האחרונות שלך:
              </Typography>
              <ul style={{ textAlign: 'right', paddingRight: theme.spacing(2), margin: 0 }}>
                <li><Typography variant="body2">משימה א': <span style={{ color: theme.palette.success.main, fontWeight: 'bold' }}>הושלמה</span></Typography></li>
                <li><Typography variant="body2">משימה ב': <span style={{ color: theme.palette.warning.main, fontWeight: 'bold' }}>בתהליך</span></Typography></li>
                <li><Typography variant="body2">משימה ג': <span style={{ color: theme.palette.error.main, fontWeight: 'bold' }}>ממתין</span></Typography></li>
              </ul>
            </Box>
            {/* כאן תוכל להוסיף כפתור לניווט לדף המשימות */}
            {/* <Button variant="outlined" color="primary" sx={{ mt: 2 }}>צפה בכל המשימות</Button> */}
          </StyledItem>
        </Grid>

        {/* כרטיס פרויקטים פעילים (דוגמה) */}
        <Grid item xs={12} md={4}>
          <StyledItem>
            <Box>
              <WorkIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                פרויקטים פעילים
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, textAlign: 'right' }}>
                הפרויקטים הפעילים שאתה מעורב בהם:
              </Typography>
              <ul style={{ textAlign: 'right', paddingRight: theme.spacing(2), margin: 0 }}>
                <li><Typography variant="body2">פרויקט X: 70% התקדמות</Typography></li>
                <li><Typography variant="body2">פרויקט Y: 30% התקדמות</Typography></li>
              </ul>
            </Box>
            {/* כאן תוכל להוסיף כפתור לניווט לדף הפרויקטים */}
            {/* <Button variant="outlined" color="primary" sx={{ mt: 2 }}>צפה בכל הפרויקטים</Button> */}
          </StyledItem>
        </Grid>

        {/* כרטיס סטטוס כללי / נתונים סטטיסטיים (דוגמה) */}
        <Grid item xs={12} md={4}>
          <StyledItem>
            <Box>
              <BarChartIcon sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }} />
              <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                נתונים סטטיסטיים
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1, textAlign: 'right' }}>
                סקירה מהירה של הפעילות שלך:
              </Typography>
              <ul style={{ textAlign: 'right', paddingRight: theme.spacing(2), margin: 0 }}>
                <li><Typography variant="body2">משימות שהושלמו השבוע: 5</Typography></li>
                <li><Typography variant="body2">פרויקטים חדשים: 1</Typography></li>
                <li><Typography variant="body2">עובדים תחתך: 8 (אם מנהל)</Typography></li>
              </ul>
            </Box>
          </StyledItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;