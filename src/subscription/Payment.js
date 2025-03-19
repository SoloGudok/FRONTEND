import React, { useEffect, useState } from "react";
import "./Payment.css"; // CSS 파일 import
import UserCard from "./UserCard";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Payment = () => {
  // ✅ 선택한 구독 리스트 상태 추가 (이전 코드에서 누락됨)
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 상태 추가

  useEffect(() => {
    // ✅ 세션 스토리지에서 선택한 구독 데이터 불러오기
    const storedSubscriptions = sessionStorage.getItem("selectedSubscriptions");
    if (storedSubscriptions) {
      const parsedSubscriptions = JSON.parse(storedSubscriptions);
      setSelectedSubscriptions(parsedSubscriptions);

      // ✅ 🔥 총 가격 및 할인된 가격 계산 추가
      const total = parsedSubscriptions.reduce(
        (sum, sub) => sum + sub.price,
        0
      );
      setTotalPrice(total);
      setDiscountedPrice(Math.round(total * 0.9)); // 10% 할인 적용
    }
  }, []);
  const handleCardSelect = (cardId) => {
    setSelectedCard(cardId); // 선택된 카드 ID 상태 업데이트
  };

  const processPayment = () => {
    if (!selectedCard) {
      alert("카드를 선택해주세요!");
      return;
    }
    if (selectedSubscriptions.length !== 3) {
      alert("구독 서비스를 정확히 3개 선택해야 합니다!");
      return;
    }

    const subscriptionIds = selectedSubscriptions.map((sub) => sub.id);

    // 🔥 데이터를 보내기 전에 콘솔에 찍어보기
    console.log("보낼 데이터:", {
      userId: 1, // 실제 로그인된 사용자 ID로 변경 필요
      selectedSubscriptions: subscriptionIds,
      totalPrice: totalPrice,
      discountedPrice: discountedPrice,
    });
    fetch("http://localhost:8090/api/v1/payment/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 1, // 🛑 실제 로그인된 사용자 ID로 변경 필요
        selectedSubscriptions: selectedSubscriptions.map((sub) => sub.id),
      }),
    })
      .then((response) => {
        console.log("✅ 서버 응답 상태 코드:", response.status); // 추가된 디버깅 로그
        return response.text(); // 응답을 JSON이 아닌 text로 받기 (백엔드 응답 형식과 맞춤)
      })
      .then((data) => {
        console.log("✅ 서버 응답 내용:", data); // 추가된 디버깅 로그
        alert(`결제가 완료되었습니다!\n서버 응답: ${data}`);

        // ✅ 결제 완료 후 세션 스토리지 비우기
        sessionStorage.removeItem("selectedSubscriptions");

        // ✅ 결제 완료 페이지로 이동 (임시로 주석 처리 후 테스트)
        // window.location.href = "/success";
      })
      .catch((error) => {
        console.error("❌ 결제 오류:", error);
        alert("결제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <h1>결제 페이지</h1>
      <h2>결제 진행</h2>
      <div className="divider"></div>
      <ul className="subscription-list">
        {selectedSubscriptions.map((sub) => (
          <li key={sub.id} className="subscription-item">
            <img
              src={`http://localhost:8090/static/subscription_img/${sub.imageUrl}`}
              alt={sub.name}
              className="subscription-img"
            />
            <Typography variant="body1" className="subscription-name">
              {sub.name}
            </Typography>
            <Typography className="subscription-price">
              {sub.price} won
            </Typography>
          </li>
        ))}
      </ul>
      {/* ✅ 결제카드 선택 UI */}
      <UserCard />

      {/* ✅ 최종 결제 금액 아코디언 UI */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="accordion-header">
            <Typography component="span">최종 결제 금액</Typography>
            <Typography component="span" className="discounted-price">
              {discountedPrice} 원
            </Typography>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className="accordion-details">
            <Typography>총 금액</Typography>
            <Typography>{totalPrice} 원</Typography>
          </div>
          <div className="accordion-details">
            <Typography>10% 할인 적용 금액</Typography>
            <Typography className="discounted-price">
              {discountedPrice} 원
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      <button onClick={processPayment}>결제하기</button>
    </div>
  );
};

export default Payment;