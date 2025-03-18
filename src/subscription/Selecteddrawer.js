import * as React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardListComponent from "../components/CardListComponent.js";
import {
  CssBaseline,
  Box,
  Typography,
  SwipeableDrawer,
  Fab,
  Button,
} from "@mui/material";
import "./Selecteddrawer.css";
import { SubscriptionList, subscriptionStorage } from "./SelectedSubscription"; // 수정된 임포트

const drawerBleeding = 56;

function SelectedDrawer({ selectedSubscriptions, toggleSubscription }) {
  const [open, setOpen] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    if (selectedSubscriptions.length === 3) {
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 5000);
    } else {
      setAlertVisible(false);
    }
  }, [selectedSubscriptions]);

  const handleOpenDialog = () => {
    if (selectedSubscriptions.length < 3) {
      alert("구독 서비스를 최소 3개 선택해야 합니다!");
      return;
    }
    setDialogOpen(true);
  };

  const handlePayment = () => {
    // 수정된 공통 유틸리티 함수 사용
    subscriptionStorage.saveToSession(selectedSubscriptions);
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
          <span className="drawer-button-text">선택한 구독 서비스</span>
        </Fab>
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        className="swipeable-drawer"
      >
        <div className="drawer-content">
          <Typography className="drawer-title">
            선택한 구독 서비스 ({selectedSubscriptions.length})
          </Typography>
        </div>
        <div className="drawer-content">
          {selectedSubscriptions.length > 0 ? (
            <>
              {/* 공통 컴포넌트 사용 */}
              <SubscriptionList
                subscriptions={selectedSubscriptions}
                onRemove={toggleSubscription}
                showDelete={true}
              />
              <button className="payment-button" onClick={handleOpenDialog}>
                결제하기
              </button>
            </>
          ) : (
            <Typography className="no-subscription-msg">
              선택한 구독 서비스가 없습니다.
            </Typography>
          )}
        </div>
      </SwipeableDrawer>

      {alertVisible && (
        <Alert severity="info" className="payment-alert">
          <AlertTitle>알림</AlertTitle>
          구독 3개 선택 완료! 결제 페이지로 이동하려면 버튼을 눌러주세요.
        </Alert>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="payment-dialog-title"
        aria-describedby="payment-dialog-description"
      >
        <DialogTitle id="payment-dialog-title">잠시만요!👋🏻</DialogTitle>
        <DialogContent>
          <DialogContentText id="payment-dialog-description">
            신한카드 발급 받고 더 다양한 혜택을 받아보세요!
            <br />
          </DialogContentText>
          <CardListComponent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handlePayment} autoFocus>
            결제 하러 가기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SelectedDrawer.propTypes = {
  selectedSubscriptions: PropTypes.array.isRequired,
  toggleSubscription: PropTypes.func.isRequired,
};

export default SelectedDrawer;
