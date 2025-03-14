import React from "react";
import { Card, CardContent } from "@mui/material";
import "./SubscriptionCard.css"; // 스타일 적용

export default function SubscriptionCard({
  subscriptions,
  selected,
  toggleSubscription,
}) {
  return (
    <div className="subscription-card-grid">
      {subscriptions.map((sub) => (
        <Card
          key={sub.id}
          variant="outlined"
          className="subscription-card-item"
          sx={{
            borderRadius: 8,
            maxWidth: "100%", // 그리드 레이아웃 대응
            height: 250,     // 카드 높이 줄이기
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
                />
              </div>
            )}

            <p className="subscription-card-name">{sub.name}</p>
            
            {/* 가격 표시 */}
            {sub.price && (
              <p className="subscription-card-price">
                {sub.price} / 달
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
