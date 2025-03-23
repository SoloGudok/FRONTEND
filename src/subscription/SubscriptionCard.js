import React from "react";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SubscriptionCard.css";

export default function SubscriptionCard({ subscriptions }) {
  const navigate = useNavigate();

  const handleSubscriptionClick = (subscriptionId) => {
    navigate(`/subscription/${subscriptionId}`);
  };

  const handleCustomCombinationClick = () => {
    navigate("/membership");
  };

  // 가격 포맷팅 함수를 더 안전하게 수정
  const formatPrice = (price) => {
    // price가 undefined, null, 비어있거나 숫자로 변환할 수 없는 경우 기본값 반환
    if (price === undefined || price === null || price === "" || isNaN(Number(price))) {
      return "가격 정보 없음";
    }
    
    try {
      // 숫자로 변환 후 천 단위 구분자 추가
      return Number(price).toLocaleString('ko-KR');
    } catch (error) {
      console.error("가격 포맷팅 오류:", error);
      return price.toString(); // 오류 발생 시 원본 값 반환
    }
  };

  // subscriptions이 없는 경우 빈 배열로 처리
  const safeSubscriptions = Array.isArray(subscriptions) ? subscriptions : [];

  return (
    <div className="subscription-card-grid">
      {/* 첫번째 "내 맘대로 구독 조합!" 카드 */}
      <Card
        variant="outlined"
        className="subscription-card-item custom-combination-card"
        sx={{
          borderRadius: 12,
          maxWidth: 200,
          height: 250,
          padding: "13px",
          textAlign: "center",
          cursor: "pointer",
          background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
          color: "white",
          margin: "12px",
          boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        onClick={handleCustomCombinationClick}
      >
        <CardContent
          className="p-3"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "0 !important", // MUI CardContent에 기본 패딩 제거
          }}
        >
          <div className="subscription-card-img-container">
            <div className="custom-card-icon">🎁</div>
          </div>
          <p className="subscription-card-name" style={{ color: "white" }}>
          내 맘대로<br />구독 조합!
          </p>
          <p className="subscription-card-description">
            나만의 구독 서비스를 조합해보세요
          </p>
        </CardContent>
      </Card>

      {/* 기존 구독 카드들 */}
      {safeSubscriptions.map((sub) => {
        // 각 항목마다 안전 검사
        const item = sub || {};
        const id = item.id || Math.random().toString();
        const name = item.name || "구독 서비스";
        const imageUrl = item.imageUrl || null;
        const hasPrice = item.price !== undefined && item.price !== null;
        
        return (
          <Card
            key={id}
            variant="outlined"
            className="subscription-card-item"
            sx={{
              borderRadius: 12,
              maxWidth: 200,
              height: 250,
              padding: "13px",
              textAlign: "center",
              margin: "12px",
              boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent
              className="p-3"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "0 !important", // MUI CardContent에 기본 패딩 제거
              }}
            >
              {imageUrl && (
                <div className="subscription-card-img-container">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="subscription-card-img"
                    onClick={() => handleSubscriptionClick(id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}

              <p className="subscription-card-name">{name}</p>

              {hasPrice && (
                <p className="subscription-card-price">
                  {formatPrice(item.price)} / 달
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}