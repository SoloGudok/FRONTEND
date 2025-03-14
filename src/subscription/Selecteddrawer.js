import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import "./Selecteddrawer.css"; // CSS 파일 불러오기
import Fab from "@mui/material/Fab";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const drawerBleeding = 56;

function Selecteddrawer({ selectedSubscriptions, toggleSubscription }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="root-container">
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Box className="drawer-button-container">
        <Fab
          variant="extended"
          size="small"
          className="drawer-button"
          onClick={toggleDrawer(true)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <ExpandLessIcon />
            선택한 구독 확인하기
          </span>
        </Fab>
      </Box>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
        sx={{
          "& .MuiPaper-root": {
            width: "100%", // ✅ 기본적으로 전체 차지
            maxWidth: "600px", // ✅ 컨텐츠와 같은 최대 너비 설정 (값은 Membership의 너비에 맞춰야 함)
            margin: "0 auto", // ✅ 중앙 정렬 (너비가 작아질 경우에도 중앙 유지)
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <div className="drawer-content">
          <div className="puller" />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            선택한 구독 서비스 ({selectedSubscriptions.length})
          </Typography>
        </div>
        <div className="drawer-content">
          {selectedSubscriptions.length > 0 ? (
            <ul className="subscription-list">
              {selectedSubscriptions.map((sub) => (
                <li key={sub.id} className="subscription-item">
                  <img
                    src={`http://localhost:8090/static/subscription_img/${sub.imageUrl}`}
                    alt={sub.name}
                  />
                  <Typography variant="body1">{sub.name}</Typography>

                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => toggleSubscription(sub)} // 🔥 삭제 기능 연결
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              <button>결제하기</button>
            </ul>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2, color: "gray" }}>
              선택한 구독 서비스가 없습니다.
            </Typography>
          )}
        </div>
      </SwipeableDrawer>
    </div>
  );
}

Selecteddrawer.propTypes = {
  selectedSubscriptions: PropTypes.array.isRequired,
};

export default Selecteddrawer;
