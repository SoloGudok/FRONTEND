import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Menu from "@mui/icons-material/Menu";
import { CssVarsProvider } from "@mui/joy/styles";
import "./Header2.css";
import logo from "./img/logo1.png";
import { Link } from "react-router-dom";

const Logo = () => (
  <div className="logo">
    <Link to="/dashboard">
      <img
        src={logo}
        alt="Logo"
        style={{
          width: "auto",
          maxHeight: "100%",
          display: "block",
          cursor: "pointer",
        }}
      />
    </Link>
  </div>
);

export default function Header() {
  const [open, setOpen] = React.useState(false);

  // 메뉴 아이템과 해당 링크를 함께 정의
  const menuItems = [
    { name: "MY", path: "/dashboard" },
    { name: "구독", path: "/my-subscriptions/1" },
    { name: "카드", path: "/cards" },
    { name: "이벤트", path: "/event" },
    { name: "구독 서비스", path: "/subscriptions" },
  ];

  return (
    <CssVarsProvider>
      <Box component="header" className="header-container">
        {/* 왼쪽에 위치한 로고 */}
        <Box className="logo-container">
          <Logo />
        </Box>

        {/* 데스크톱 메뉴 - 중간 이상 화면에서만 표시 */}
        <Box className="desktop-menu">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <Typography className="menu-item">{item.name}</Typography>
            </Link>
          ))}
        </Box>

        {/* 모바일 메뉴 버튼 - 작은 화면에서만 표시 */}
        <Box className="mobile-menu-button">
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Box>

        {/* 모바일 드로어 메뉴 */}
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <ModalClose onClick={() => setOpen(false)} />
          </Box>
          <List className="drawer-menu-list">
            {menuItems.map((item) => (
              <ListItemButton
                key={item.name}
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
                className="drawer-menu-item"
              >
                {item.name}
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </CssVarsProvider>
  );
}
