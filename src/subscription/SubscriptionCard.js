import React from "react";
import { Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 🔴 (추가됨) 페이지 이동을 위한 useNavigate 추가
import "./SubscriptionCard.css";

export default function SubscriptionCard({ subscriptions }) {
  const navigate = useNavigate(); // 🔴 (추가됨) 페이지 이동 함수

  const handleSubscriptionClick = (subscriptionId) => {
    navigate(`/subscription/${subscriptionId}`); // 🔴 (추가됨) 상세 페이지로 이동
  };

  return (
    <div className="subscription-card-grid">
      {subscriptions.map((sub) => (
        <Card
          key={sub.id}
          variant="outlined"
          className="subscription-card-item"
          sx={{
            borderRadius: 8,
            maxWidth: "100%",
            height: 250,
            padding: "12px",
            textAlign: "center",
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
            }}
          >
            {sub.imageUrl && (
              <div className="subscription-card-img-container">
                <img
                  src={sub.imageUrl}
                  alt={sub.name}
                  className="subscription-card-img"
                  onClick={() => handleSubscriptionClick(sub.id)} // 🔴 (추가됨) 클릭 시 상세 페이지 이동
                  style={{ cursor: "pointer" }} // 🔴 (추가됨) 마우스 오버 시 손가락 모양 표시
                />
              </div>
            )}

            <p className="subscription-card-name">{sub.name}</p>

            {sub.price && (
              <p className="subscription-card-price">{sub.price} / 달</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
