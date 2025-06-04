// const navBarStyles = {
//     appBar: {
//       top: 0,
//       width: "100%",
//       zIndex: 100,
//       backgroundColor: "#ffffff",
//       boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//       height: "70px",
//     },
//     toolbar: {
//       minHeight: "70px",
//     },
//     desktopLogoBox: {
//       display: { xs: "none", md: "flex" },
//       alignItems: "center",
//       mr: 2,
//     },
//     mobileMenuBox: {
//       flexGrow: 1,
//       display: { xs: "flex", md: "none" },
//     },
//     mobileLogoBox: {
//       display: { xs: "flex", md: "none" },
//       flexGrow: 1,
//       alignItems: "center",
//     },
//     desktopNavBox: {
//       flexGrow: 1,
//       display: { xs: "none", md: "flex" },
//       ml: 4,
//     },
//     navButton: {
//       color: "#333333",
//       display: "block",
//       fontSize: "15px",
//       fontWeight: 500,
//       mx: 1,
//       px: 2,
//       py: 2.5,
//       borderRadius: 0,
//       textTransform: "none",
//       borderBottom: "3px solid transparent",
//       "&:hover": { backgroundColor: "#f5f5f5" },
//     },
//     menuPaper: {
//       backgroundColor: "#ffffff",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     },
//     logoutButton: {
//       borderRadius: 6,
//       textTransform: "none",
//     },
//     // הוספנו כאן סגנון אחיד ללינקים בתוך התפריט
//     link: {
//       textDecoration: "none",
//       color: "inherit",
//       "&:hover": {
//         color: "#F17B45", // אפשר להוסיף אפקט הובר אם רוצים
//       },
//     },
//   };
  
//   export default navBarStyles;
  

const NavBarStyles = {
  appBar: {
    top: 0,
    width: "100%",
    zIndex: 100,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    height: "70px",
  },
  toolbar: {
    minHeight: "70px",
  },
  desktopLogoBox: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    mr: 2,
  },
  mobileMenuBox: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
  },
  mobileLogoBox: {
    display: { xs: "flex", md: "none" },
    flexGrow: 1,
    alignItems: "center",
  },
  desktopNavBox: {
    flexGrow: 1,
    display: { xs: "none", md: "flex" },
    ml: 4,
  },
  navButton: {
    color: "#333333",
    display: "block",
    fontSize: "15px",
    fontWeight: 500,
    mx: 1,
    px: 2,
    py: 2.5,
    borderRadius: 0,
    textTransform: "none",
    borderBottom: "3px solid transparent",
    "&:hover": { backgroundColor: "#f5f5f5" },
  },
  menuPaper: {
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  logoutButton: {
    borderRadius: 6,
    textTransform: "none",
  },
  linkTypography: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      color: "#F17B45",
      cursor: "pointer",
    },
    textAlign: "center",
    width: "100%",
  },
};

export default NavBarStyles;
