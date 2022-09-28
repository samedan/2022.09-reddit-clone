import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../context/AuthContext";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signUserOut = async () => {
    await Auth.signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" style={{ marginTop: 10 }}>
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => router.push("/")}
              sx={{ mr: 2 }}
            >
              <AccountTreeIcon />
              {/* <MenuIcon /> */}
            </IconButton>
          </Link>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Reddit clone
            </Typography>
          </Link>
          {user && (
            <div>
              <Tooltip title="Create post">
                <IconButton
                  aria-label="delete"
                  color="inherit"
                  onClick={() => router.push("/create")}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => signUserOut()}>Sign out</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
              </Menu>
            </div>
          )}
          {!user && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="contained"
                onClick={() => router.push("/login")}
                style={{ marginRight: "5px" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push("/signup")}
              >
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
