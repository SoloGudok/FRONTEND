// SelectedSubscription.js
import React from "react";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// 구독 목록 렌더링을 위한 공통 컴포넌트
export const SubscriptionList = ({
  subscriptions,
  onRemove,
  showDelete = true,
}) => {
  return (
    <ul className="subscription-list">
      {subscriptions.map((sub) => (
        <li key={sub.id} className="subscription-item">
          <img
            src={`http://localhost:8090/static/subscription_img/${sub.imageUrl}`}
            alt={sub.name}
            className="subscription-img"
          />
          <Typography
            variant="body1"
            className={showDelete ? "" : "subscription-name"}
          >
            {sub.name}
          </Typography>
          {showDelete && onRemove && (
            <IconButton
              aria-label="delete"
              size="small"
              className="delete-btn"
              onClick={() => onRemove(sub)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          {!showDelete && (
            <Typography className="subscription-price">
              {sub.price} won
            </Typography>
          )}
        </li>
      ))}
    </ul>
  );
};

// 구독 관련 유틸리티 함수
export const subscriptionStorage = {
  // 세션 스토리지에 구독 정보 저장
  saveToSession: (subscriptions) => {
    sessionStorage.setItem(
      "selectedSubscriptions",
      JSON.stringify(subscriptions)
    );
  },

  // 세션 스토리지에서 구독 정보 로드
  loadFromSession: () => {
    const storedSubscriptions = sessionStorage.getItem("selectedSubscriptions");
    return storedSubscriptions ? JSON.parse(storedSubscriptions) : [];
  },

  // 세션 스토리지 비우기
  clearSession: () => {
    sessionStorage.removeItem("selectedSubscriptions");
  },
};

// 가격 계산 관련 유틸리티
export const priceCalculator = {
  // 총 가격 계산
  calculateTotal: (subscriptions) => {
    return subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  },

  // 할인된 가격 계산 (10% 할인)
  calculateDiscount: (totalPrice) => {
    return Math.round(totalPrice * 0.9);
  },
};

export default { SubscriptionList, subscriptionStorage, priceCalculator };
