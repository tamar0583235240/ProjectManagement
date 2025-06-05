// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import { Link, useNavigate } from "react-router-dom";
// import LockIcon from "@mui/icons-material/Lock";
// import NavBarStyles from "../style/NavBarStyles";
// const NavBar = () => {
//   const pages = ["HomePage", "Projects", "OrganizationAbout", "employee-management"];
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const navigate = useNavigate();
//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//   const handleLogout = () => {
//     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     localStorage.clear();
//     navigate("/landingPage");
//   };
//   return (
//     <AppBar position="fixed" sx={NavBarStyles.appBar}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters sx={NavBarStyles.toolbar}>
//           {/* לוגו דסקטופ */}
//           <Box sx={NavBarStyles.desktopLogoBox}>
//             <LockIcon sx={{ color: "#00A3B4", fontSize: 32, mr: 1 }} />
//             <Typography
//               variant="h5"
//               noWrap
//               component={Link}
//               to="/"
//               sx={{
//                 fontFamily: "system-ui, sans-serif",
//                 fontWeight: 700,
//                 color: "#00A3B4",
//                 textDecoration: "none",
//                 "&:hover": { color: "#F17B45" },
//               }}
//             >
//               PROJECTLY
//             </Typography>
//           </Box>
//           {/* תפריט מובייל */}
//           <Box sx={NavBarStyles.mobileMenuBox}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               sx={{ color: "#00A3B4" }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               keepMounted
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//                 "& .MuiPaper-root": NavBarStyles.menuPaper,
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   {/* עטיפה ב־Typography ל־sx */}
//                   <Typography sx={NavBarStyles.linkTypography} component={Link} to={`/${page === "HomePage" ? "" : page}`}>
//                     {page === "HomePage" ? "Home" : page}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           {/* לוגו מובייל */}
//           <Box sx={NavBarStyles.mobileLogoBox}>
//             <LockIcon sx={{ color: "#00A3B4", fontSize: 28, mr: 1 }} />
//             <Typography
//               variant="h6"
//               noWrap
//               component={Link}
//               to="/"
//               sx={{
//                 fontFamily: "system-ui, sans-serif",
//                 fontWeight: 700,
//                 color: "#00A3B4",
//                 textDecoration: "none",
//               }}
//             >
//               PROJECTLY
//             </Typography>
//           </Box>
//           {/* ניווט דסקטופ */}
//           <Box sx={NavBarStyles.desktopNavBox}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 component={Link}
//                 to={`/app/${page === "HomePage" ? "" : page.toLowerCase()}`}
//                 onClick={handleCloseNavMenu}
//                 sx={NavBarStyles.navButton}
//               >
//                 {page === "HomePage" ? "Home" : page}
//               </Button>
//             ))}
//           </Box>
//           <Button
//             onClick={handleLogout}
//             variant="contained"
//             color="primary"
//             sx={NavBarStyles.logoutButton}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default NavBar;
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import NavBarStyles from "../style/NavBarStyles";
import useCurrentUser from "../hooks/useCurrentUser"; // **ודא שהנתיב נכון ל-hook שלך**

const NavBar = () => {
  // **קבלת אובייקט המשתמש מה-hook הקיים שלך**
  const user = useCurrentUser();

  // הגדרת הדפים, עם הוספה מותנית של "Employee Management"
  const allPages = [
    { name: "HomePage", displayName: "Home", path: "" },
    { name: "Projects", displayName: "Projects", path: "projects" },
    { name: "OrganizationAbout", displayName: "Organization About", path: "organizationabout" },
    // **התנאי:** הוספת קישור "Employee Management" רק אם קיים משתמש ותפקידו הוא 'MANAGER'
    user?.role === 'MANAGER' && { name: "EmployeeManagement", displayName: "Employee Management", path: "employee-management" },
  ].filter(Boolean); // מסנן החוצה ערכי false/null (כאשר התנאי לא מתקיים)

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    // מנקה את כל ה-localStorage, כולל "currentUser"
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.clear();
    navigate("/landingPage");
  };

  return (
    <AppBar position="fixed" sx={NavBarStyles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={NavBarStyles.toolbar}>
          {/* לוגו דסקטופ */}
          <Box sx={NavBarStyles.desktopLogoBox}>
            <LockIcon sx={{ color: "#00A3B4", fontSize: 32, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/app" // הקישור לדף הבית של האפליקציה (בהנחה שזהו /app)
              sx={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 700,
                color: "#00A3B4",
                textDecoration: "none",
                "&:hover": { color: "#F17B45" },
              }}
            >
              PROJECTLY
            </Typography>
          </Box>

          {/* תפריט מובייל */}
          <Box sx={NavBarStyles.mobileMenuBox}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#00A3B4" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": NavBarStyles.menuPaper,
              }}
            >
              {allPages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={NavBarStyles.linkTypography}
                    component={Link}
                    to={`/app/${page.path}`} // שימוש ב-page.path
                  >
                    {page.displayName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* לוגו מובייל */}
          <Box sx={NavBarStyles.mobileLogoBox}>
            <LockIcon sx={{ color: "#00A3B4", fontSize: 28, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/app" // הקישור לדף הבית של האפליקציה
              sx={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 700,
                color: "#00A3B4",
                textDecoration: "none",
              }}
            >
              PROJECTLY
            </Typography>
          </Box>

          {/* ניווט דסקטופ */}
          <Box sx={NavBarStyles.desktopNavBox}>
            {allPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={`/app/${page.path}`} // שימוש ב-page.path
                onClick={handleCloseNavMenu}
                sx={NavBarStyles.navButton}
              >
                {page.displayName}
              </Button>
            ))}
          </Box>

          {/* כפתור יציאה (Logout) */}
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
            sx={NavBarStyles.logoutButton}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;