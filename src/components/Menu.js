import * as React from "react";
import { styled, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: 'none',
          background: 'white',
          color: 'black',
          marginLeft: '-50px'
        },
      },
    },
  },
});

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const userData = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userData);
  let token = "";
  if (userInfo !== null) {
      token = userInfo.token;
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            // endIcon={<KeyboardArrowDownIcon />}
          ><MenuIcon /></Button>
      </ThemeProvider>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            if (token === "") navigate("/signin"); else navigate("/exchanges"); 
          }}
          disableRipple
        >
          <ChangeCircleIcon />
          Trocas
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <AutoStoriesIcon />
          Meus livros
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Editar dados pessoais
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ManageAccountsIcon />
          Alterar email e senha
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <HelpIcon />
          Ajuda
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          console.log('tokenn', token)
          localStorage.removeItem("userInfo");
          navigate("/signin");
          }} disableRipple>
          <LogoutIcon />
          Sair
        </MenuItem>
      </StyledMenu>
    </div>
  );
}