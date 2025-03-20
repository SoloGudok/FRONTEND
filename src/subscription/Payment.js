import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import UserCard from "./UserCard"; // UserCard 컴포넌트 추가
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuFooter from "../components/MenuFooter";
import {
  SubscriptionList,
  subscriptionStorage,
  priceCalculator,
} from "./SelectedSubscription";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [combinationType, setCombinationType] = useState(1); // 1: 조합결제, 0: 개별결제

  // 다이얼로그 상태 관리
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);
  const [failureRedirect, setFailureRedirect] = useState("");

  useEffect(() => {
    if (location.state && location.state.selectedSubscriptions) {
      setSelectedSubscriptions(location.state.selectedSubscriptions);
      setCombinationType(location.state.combination ?? 0);
      const total = location.state.selectedSubscriptions.reduce(
        (sum, sub) => sum + sub.price,
        0
      );
      setTotalPrice(total);
      setDiscountedPrice(
        location.state.combination === 1 ? Math.floor(total * 0.9) : total
      );
    } else {
      const parsedSubscriptions = subscriptionStorage.loadFromSession();
      setSelectedSubscriptions(parsedSubscriptions);
      setCombinationType(1);
      const total = priceCalculator.calculateTotal(parsedSubscriptions);
      setTotalPrice(total);
      setDiscountedPrice(priceCalculator.calculateDiscount(total));
    }
  }, [location]);

  const openDialog = (title, message, isSuccess = false) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setIsSuccessDialog(isSuccess);
    setDialogOpen(true);

    // 실패 시 이동할 페이지 설정
    if (!isSuccess) {
      setFailureRedirect(
        combinationType === 0 ? "/subscriptions" : "/membership"
      );
    } else {
      setFailureRedirect(""); // 성공 시에는 이동할 필요 없음
    }

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (isSuccessDialog) {
      setTimeout(() => {
        subscriptionStorage.clearSession();
        navigate("/"); // 성공 시 메인 페이지로 이동
      }, 500); // 0.5초 지연 후 페이지 이동 (UI 깜빡임 방지)
    } else if (failureRedirect) {
      navigate(failureRedirect); // 실패 시 지정된 페이지로 이동
    }
  };

  const processPayment = () => {
    const userId = 1;
    if (!userId) {
      openDialog("알림", "카드를 선택해주세요!");
      return;
    }

    if (combinationType === 1 && selectedSubscriptions.length !== 3) {
      openDialog("알림", "구독 서비스를 정확히 3개 선택해야 합니다!");
      return;
    }

    if (combinationType === 0) {
      // 개별 결제 처리
      if (selectedSubscriptions.length !== 1) {
        openDialog("오류", "개별 결제는 하나의 구독 서비스만 선택해야 합니다!");
        return;
      }

      const subscriptionId = selectedSubscriptions[0].id;

      // 개별 결제 처리 부분 수정
      fetch("http://localhost:8090/api/v1/payment/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          subscriptionId: subscriptionId,
          combination: 0,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(
                errorData.message || "결제 처리 중 오류가 발생했습니다."
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          openDialog("결제 완료", "개별 구독 결제가 완료되었습니다!", true);
        })
        .catch((error) => {
          // 서버에서 받은 에러 메시지를 그대로 보여줌
          openDialog("결제 실패", error.message);
        });
    } else {
      // 조합 결제 처리
      const subscriptionIds = selectedSubscriptions.map((sub) => sub.id);

      const requestBody = {
        userId: 1,
        selectedSubscriptions: subscriptionIds,
        combination: 1,
      };

      // 조합 결제 처리 부분 수정
      fetch("http://localhost:8090/api/v1/payment/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorMessage) => {
              throw new Error(errorMessage);
            });
          }
          return response.json();
        })
        .then((data) => {
          openDialog("결제 완료", "구독 조합 결제가 완료되었습니다!", true);
        })
        .catch((error) => {
          // 서버에서 받은 에러 메시지를 그대로 보여줌
          openDialog("결제 실패", error.message);
        });
    }
  };

  return (
    <div>
      <h1>결제 페이지</h1>
      <h2>
        {combinationType === 0 ? "개별 결제 진행" : "구독 조합 결제 진행"}
      </h2>
      <div className="divider"></div>

      <SubscriptionList
        subscriptions={selectedSubscriptions}
        showDelete={false}
      />

      {/* UserCard 컴포넌트 추가 */}
      <UserCard />

      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
          <div className="accordion-header">
            <Typography>최종 결제 금액</Typography>
            <Typography className="discounted-price">
              {discountedPrice} 원
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordion-details">
            <Typography>총 금액</Typography>
            <Typography>{totalPrice} 원</Typography>
          </div>
        </AccordionDetails>
      </Accordion>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button className="payment-button-final" onClick={processPayment}>
          {combinationType === 0 ? "개별 구독 결제하기" : "구독 조합 결제하기"}
        </button>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          <h2 className="h2">{dialogTitle}</h2>{" "}
          {/* 첫 번째 문장은 h1 태그로 변경 */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p className="p">{dialogMessage}</p>{" "}
            {/* 나머지 문장은 p 태그로 변경 */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleDialogClose}
            autoFocus
            className="custom-dialog-button"
          >
            {isSuccessDialog ? "확인" : "닫기"}
          </button>
        </DialogActions>
      </Dialog>
      <MenuFooter />
    </div>
  );
};

export default Payment;
