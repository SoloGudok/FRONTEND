import React, { useEffect, useState } from "react";
import axios from "axios";
import Categorymenu from "../components/Categorymenu";
import SubscriptionCard from "./SubscriptionCard"; // 여기를 SubscriptionCard로 변경
import MenuFooter from "../components/MenuFooter";

import "./membership.css"; // CSS 파일 import

export default function List() {
  const [subscriptions, setSubscriptions] = useState([]); // 구독 리스트
  const [selected, setSelected] = useState([]); // 선택된 구독 리스트
  const [currentCategoryId, setCurrentCategoryId] = useState(0); // 현재 선택된 카테고리 ID (0은 전체)
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // ✅ 구독 리스트 가져오기 (카테고리 ID에 따라 다른 API 호출)
  useEffect(() => {
    setLoading(true); // 데이터 로딩 시작

    // 카테고리 ID가 0이면 전체 구독 리스트 가져오기
    const url =
      currentCategoryId === 0
        ? "http://localhost:8090/api/v1/subscription"
        : `http://localhost:8090/api/v1/subscription/category/${currentCategoryId}/dto`;

    axios
      .get(url)
      .then((response) => {
        console.log("구독 데이터:", response.data);
        
        // 데이터가 유효한지 확인
        if (Array.isArray(response.data)) {
          // 데이터가 배열인 경우, 각 항목을 확인하고 필요한 경우 기본값 설정
          const safeData = response.data.map(item => ({
            id: item.id || Math.random().toString(),
            name: item.name || "구독 서비스",
            price: item.price, // 가격은 그대로 두고 컴포넌트에서 처리
            imageUrl: item.imageUrl || null,
            // 기타 필요한 필드들...
          }));
          setSubscriptions(safeData);
        } else {
          // 배열이 아닌 경우 빈 배열로 설정
          console.error("API에서 배열 형태의 데이터를 반환하지 않았습니다:", response.data);
          setSubscriptions([]);
        }
      })
      .catch((error) => {
        console.error("구독 목록 가져오기 실패", error);
        setSubscriptions([]); // 에러 발생 시 빈 배열로 설정
      })
      .finally(() => {
        setLoading(false); // 데이터 로딩 완료
      });
  }, [currentCategoryId]); // 카테고리 ID가 변경될 때마다 실행

  // ✅ 카테고리 변경 핸들러
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
          {loading ? (
            <p className="text-center">구독 데이터를 불러오는 중...</p>
          ) : subscriptions.length > 0 ? (
            <SubscriptionCard
              subscriptions={subscriptions}
              selected={selected}
            />
          ) : (
            <p className="text-center">표시할 구독 데이터가 없습니다.</p>
          )}
        </div>
      </div>
      <MenuFooter />
    </>
  );
}