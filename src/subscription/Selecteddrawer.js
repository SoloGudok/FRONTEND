import * as React from "react";
import PropTypes from "prop-types";
import {
  CssBaseline,
  Box,
  Typography,
  SwipeableDrawer,
  Fab,
  IconButton,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Selecteddrawer.css"; // ✅ CSS 적용

const drawerBleeding = 56;

function Selecteddrawer({ selectedSubscriptions, toggleSubscription }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  // ✅ 결제 버튼 클릭 시 실행될 함수
  const handlePayment = () => {
    if (selectedSubscriptions.length < 3) {
      alert("구독 서비스를 최소 3개 선택해야 합니다!");
      return;
    }

    // ✅ 선택한 구독 데이터를 세션 스토리지에 저장
    sessionStorage.setItem(
      "selectedSubscriptions",
      JSON.stringify(selectedSubscriptions)
    );

    // ✅ 결제 페이지로 이동
    window.location.href = "/payment";
  };

  return (
    <div className="root-container">
      <CssBaseline />
      <Box
        className="drawer-button-container"
        style={{ display: open ? "none" : "block" }}
      >
        <Fab
          variant="extended"
          size="small"
          className="drawer-button"
          onClick={() => toggleDrawer(true)}
        >
          <span className="drawer-button-text">
            <ExpandLessIcon />
            선택한 구독 확인하기
          </span>
        </Fab>
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)} // ✅ 화살표 함수로 수정
        onOpen={() => toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
        className="swipeable-drawer"
      >
        <div className="drawer-content">
          <Typography className="drawer-title">
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
                    className="subscription-img"
                  />
                  <Typography variant="body1">{sub.name}</Typography>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    className="delete-btn"
                    onClick={() => toggleSubscription(sub)} // ✅ 화살표 함수로 수정
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </li>
              ))}
              {/* ✅ 결제하기 버튼 추가 */}
              <button className="payment-button" onClick={handlePayment}>
                결제하기
              </button>
            </ul>
          ) : (
            <Typography className="no-subscription-msg">
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
