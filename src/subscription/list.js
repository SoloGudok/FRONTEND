import React, { useEffect, useState } from "react";
import axios from "axios";
import Categorymenu from "../components/Categorymenu";
import Subscriptionlist from "./SubscriptionCard";
import MenuFooter from "../components/MenuFooter";

import "./membership.css"; // CSS 파일 import

export default function List() {
  const [subscriptions, setSubscriptions] = useState([]); // 구독 리스트
  const [selected, setSelected] = useState([]); // 선택된 구독 리스트
  const [currentCategoryId, setCurrentCategoryId] = useState(0); // 현재 선택된 카테고리 ID (0은 전체)

  // ✅ 구독 리스트 가져오기 (카테고리 ID에 따라 다른 API 호출)
  useEffect(() => {
    // 카테고리 ID가 0이면 전체 구독 리스트 가져오기
    const url =
      currentCategoryId === 0
        ? "http://localhost:8090/api/v1/subscription"
        : `http://localhost:8090/api/v1/subscription/category/${currentCategoryId}/dto`;

    axios
      .get(url)
      .then((response) => {
        console.log("구독 데이터:", response.data);
        setSubscriptions(response.data);
      })
      .catch((error) => console.error("구독 목록 가져오기 실패", error));
  }, [currentCategoryId]); // 카테고리 ID가 변경될 때마다 실행

  // ✅ 구독 선택/취소 함수

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId) => {
    setCurrentCategoryId(categoryId);
  };

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
        <h2
          style={{
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px",
          }}
        >
          구독 서비스 한눈에 보기!
        </h2>

        <Categorymenu setSelectedCategory={handleCategoryChange} />

        <div className="w-full mt-4">
          {/* ✅ 구독 목록이 존재할 때만 렌더링 */}
          {subscriptions.length > 0 ? (
            <Subscriptionlist
              subscriptions={subscriptions}
              selected={selected}
            />
          ) : (
            <p className="text-center">구독 데이터를 불러오는 중...</p>
          )}
        </div>
      </div>
      <MenuFooter />
    </>
  );
}
