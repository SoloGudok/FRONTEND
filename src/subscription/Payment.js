import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import UserCard from "./UserCard";

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
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 상태 추가
  const [combinationType, setCombinationType] = useState(1); // 1: 조합결제, 0: 개별결제

  // 다이얼로그 상태 관리
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);

  useEffect(() => {
    if (location.state && location.state.selectedSubscriptions) {
      setSelectedSubscriptions(location.state.selectedSubscriptions);
      setCombinationType(location.state.combination ?? 0);
      const total = location.state.selectedSubscriptions.reduce(
        (sum, sub) => sum + sub.price,
        0
      );
      setTotalPrice(total);
      setDiscountedPrice(Math.round(total * 0.9)); // 10% 할인 적용
    }
  }, [location]);

  const openDialog = (title, message, isSuccess = false) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setIsSuccessDialog(isSuccess);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (isSuccessDialog) {
      setTimeout(() => {
        subscriptionStorage.clearSession();
        navigate("/");
      }, 500); // ✅ 0.5초 지연 후 페이지 이동 (UI 깜빡임 방지)
    }
  };

  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId); // 선택된 카드 ID 상태 업데이트
  };

  const processPayment = () => {
    if (!selectedCard) {
      alert("카드를 선택해주세요!");
      return;
    }

    if (combinationType === 1 && selectedSubscriptions.length !== 3) {
      openDialog("알림", "구독 서비스를 정확히 3개 선택해야 합니다!");
      return;
    }

    if (combinationType === 0) {
      // ✅ 개별 결제 처리
      if (selectedSubscriptions.length !== 1) {
        openDialog("오류", "개별 결제는 하나의 구독 서비스만 선택해야 합니다!");
        return;
      }

      const subscriptionId = selectedSubscriptions[0].id;

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
          console.log("서버 응답 상태:", response.status);
          if (!response.ok) {
            throw new Error(`❌ 서버 응답 오류: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("서버 응답 데이터:", data);
          openDialog("결제 완료", "✅ 개별 구독 결제가 완료되었습니다!", true);
        })
        .catch((error) => {
          console.error("❌ 결제 오류:", error);
          openDialog(
            "오류",
            error.message || "❌ 결제 중 오류가 발생했습니다."
          );
        });
    } else {
      // ✅ 조합 결제 처리
      const subscriptionIds = selectedSubscriptions.map((sub) => sub.id);

      const requestBody = {
        userId: 1,
        selectedSubscriptions: subscriptionIds,
        combination: 1,
      };

      console.log("보내는 데이터:", JSON.stringify(requestBody));

      fetch("http://localhost:8090/api/v1/payment/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.text())
        .then((data) => {
          openDialog("결제 완료", "✅ 구독 조합 결제가 완료되었습니다!", true);
        })
        .catch((error) => {
          console.error("❌ 결제 오류:", error);
          openDialog("오류", "❌ 결제 중 오류가 발생했습니다.");
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

      {/* ✅ 결제카드 선택 UI */}
      <UserCard />

      {/* ✅ 최종 결제 금액 아코디언 UI */}
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
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {isSuccessDialog ? "확인" : "닫기"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payment;
