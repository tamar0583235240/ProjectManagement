import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { Link, useNavigate } from "react-router-dom"

import LockIcon from "@mui/icons-material/Lock"

const NavBar = () => {
    const pages = ["HomePage", "Projects", "Tasks", "employee-management"]
    const settings = ["Profile"]

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const navigate = useNavigate()  // מאפשר לנווט לתוך הקוד

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    // פונקציית יציאה (Logout)
    const handleLogout = () => {
        // מחיקת קוקיז - כאן לדוגמה פשוט נמחק cookie בשם "token"
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

        // מחיקת כל ה-localStorage (אפשר גם למחוק רק פריטים ספציפיים)
        localStorage.clear()

        // הפניה לדף הנחיתה
        navigate("/landingPage")
    }

    return (
        <>
            <AppBar
                position="fixed"
                style={{
                    top: 0,
                    width: "100%",
                    zIndex: 100,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    height: "70px",
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ minHeight: "70px" }}>
                        {/* לוגו */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "flex" },
                                alignItems: "center",
                                mr: 2,
                            }}
                        >
                            <LockIcon sx={{ color: "#00A3B4", fontSize: 32, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    fontFamily: "system-ui, sans-serif",
                                    fontWeight: 700,
                                    color: "#00A3B4",
                                    textDecoration: "none",
                                    "&:hover": {
                                        color: "#F17B45",
                                    },
                                }}
                            >
                                PROJECTLY
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
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
                                    "& .MuiPaper-root": {
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: "center", color: "#333" }}>
                                            <Link
                                                to={`/${page === "HomePage" ? "" : page}`}
                                                style={{ textDecoration: "none", color: "inherit" }}
                                            >
                                                {page === "HomePage" ? "Home" : page}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* לוגו לנייד */}
                        <Box
                            sx={{
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                alignItems: "center",
                            }}
                        >
                            <LockIcon sx={{ color: "#00A3B4", fontSize: 28, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/"
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
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                                ml: 4,
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={`/app/${page === "HomePage" ? "" : page.toLowerCase()}`}
                                    onClick={handleCloseNavMenu}
                                    sx={{
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
                                        "&:hover": {
                                            backgroundColor: "transparent",
                                            borderBottom: "3px solid #00A3B4",
                                            color: "#00A3B4",
                                        },
                                    }}
                                >
                                    {page === "HomePage" ? "Home" : page}
                                </Button>
                            ))}
                        </Box>

                        {/* כפתור יציאה */}
                        <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
                            <Button
                                onClick={handleLogout}
                                sx={{
                                    color: "#ffffff",
                                    backgroundColor: "#00A3B4",
                                    padding: "8px 16px",
                                    marginRight: "16px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "4px",
                                    "&:hover": {
                                        backgroundColor: "#008999",
                                    },
                                }}
                            >
                                LOGOUT
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ height: "0px" }} />
        </>
    )
}

export default NavBar
