import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SubscriptionDetail.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CardListComponent from "../components/CardListComponent"; // 🔥 카드 추천 컴포넌트 추가
import MenuFooter from "../components/MenuFooter";

const SubscriptionDetail = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // ✅ 다이얼로그 상태 추가

  // ✅ 구독 정보 가져오는 API 호출 추가
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/subscription/${subscriptionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`❌ 서버 응답 오류: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSubscription(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ 데이터 불러오기 오류:", error);
        setError(error);
        setLoading(false);
      });
  }, [subscriptionId]);

  // ✅ "결제하기" 버튼을 누르면 다이얼로그 먼저 표시 (구독 조합 결제와 동일한 동작)
  const handleOpenDialog = () => {
    if (!subscription || !subscription.id) {
      alert("결제할 구독 정보를 찾을 수 없습니다.");
      return;
    }
    setDialogOpen(true); // ✅ 다이얼로그 열기
  };

  // ✅ 다이얼로그에서 "결제 하러 가기"를 누르면 결제 페이지로 이동
  const handleProceedToPayment = () => {
    setDialogOpen(false); // 다이얼로그 닫기

    navigate("/payment", {
      state: {
        selectedSubscriptions: [subscription], // 🔥 개별 구독 정보 전달
        combination: 0, // 개별 결제
      },
    });
  };

  // ✅ 로딩 및 오류 처리 추가
  if (loading) return <p>⏳ 구독 정보를 불러오는 중...</p>;
  if (error) return <p>❌ 오류 발생: {error.message}</p>;

  return (
    <>
      <div className="subscription-detail-container">
        <img
          src={
            subscription.imageUrl ? subscription.imageUrl : "/default-image.jpg"
          }
          style={{
            width: "200px",
            objectFit: "cover",
            boxShadow: "4px 4px 10px rgba(50, 123, 240, 0.3)",
          }}
          alt="구독 서비스 이미지"
        />

        <div className="info type2">
          <div className="info-name">
            <div className="subscription_name">
              <h1>{subscription.name || "구독 이름 없음"}</h1>
            </div>
          </div>
          <p className="sub-summary">
            {subscription.content || "설명이 없습니다."}
          </p>
          <ul className="sub-content">
            <li>
              <b>
                {subscription.price
                  ? `월 ${subscription.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
                  : "가격 정보 없음"}
              </b>
            </li>
          </ul>
        </div>

        {/* 🔥 다이얼로그 먼저 띄우는 결제 버튼 */}
        <button className="subscribe-button" onClick={handleOpenDialog}>
          결제하기
        </button>

        {/* ✅ 다이얼로그 추가 (구독 조합과 동일) */}
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
            <Button onClick={handleProceedToPayment} autoFocus>
              결제 하러 가기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <MenuFooter />
    </>
  );
};

export default SubscriptionDetail;
