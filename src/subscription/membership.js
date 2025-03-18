import React, { useEffect, useState } from "react";
import axios from "axios";
import Categorymenu from "../components/Categorymenu";
import Selecteddrawer from "./Selecteddrawer";
import Subscriptionlist from "./Subscriptionlist";
import membershipImg from "./membershipimg.jpg";
import step1Img from "./step1.png";
import step1Img2 from "./step2.png";
import "./membership.css"; // CSS 파일 import

export default function Membership() {
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
  const toggleSubscription = (subscription) => {
    setSelected((prev) => {
      const isSelected = prev.some((s) => s.id === subscription.id);

      if (isSelected) {
        axios
          .put(
            `http://localhost:8090/api/v1/subscription/unselect/${subscription.id}`
          )
          .then(() => console.log("구독 선택 취소 성공"))
          .catch((error) => console.error("구독 선택 취소 실패", error));

        return prev.filter((s) => s.id !== subscription.id);
      }

      if (prev.length < 3) {
        axios
          .post("http://localhost:8090/api/v1/subscription/select", [
            ...prev.map((s) => s.id),
            subscription.id,
          ])
          .then(() => console.log("구독 선택 성공"))
          .catch((error) => console.error("구독 선택 실패", error));

        return [...prev, subscription];
      }

      return prev;
    });
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId) => {
    setCurrentCategoryId(categoryId);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1>구독 리스트</h1>

      <div>
        <img
          src={membershipImg}
          style={{
            width: "550px",
            objectFit: "cover",
            boxShadow: "4px 4px 10px rgba(50, 123, 240, 0.3)", // 파란색 계열 그림자 효과
          }}
          alt="멤버십 이미지"
        />
      </div>
      {/* 신한카드 정보 추가 */}
      <div className="info type2">
        <div className="info-name">
          <div className="card_name">
            <h1>내 맘대로 구독서비스 골라담기!</h1>
          </div>
        </div>
        <p className="info-summary">
          원하는 구독 서비스만 골라서 조합하고
          <br />
          할인 10%까지!
        </p>
        <ul className="info-benefit">
          <li>
            <span>대상</span>
            <b>신한카드 고객</b>
          </li>
          <li>
            <span>상품내용</span>
            <b>10% 할인 혜택</b>
          </li>
        </ul>
      </div>
      <Categorymenu onCategorySelect={handleCategoryChange} />
      <div className="w-full mt-4">
        {/* ✅ 구독 목록이 존재할 때만 렌더링 */}
        {subscriptions.length > 0 ? (
          <Subscriptionlist
            subscriptions={subscriptions}
            selected={selected}
            toggleSubscription={toggleSubscription}
          />
        ) : (
          <p className="text-center">구독 데이터를 불러오는 중...</p>
        )}
        {/*밥먹고 수정하기*/}
        <h2>
          <div className="product-detail">상품 상세👓</div>
        </h2>
        <div className="divider"></div>
        <div className="step-badge">step 1.</div>
        <br />

        <div className="step-container">
          <h3>step 1. 원하는 구독 서비스 담기! </h3>

          <img
            src={step1Img}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px", // 모서리를 둥글게 (10px 라운드)
              border: "3px solid rgba(50, 123, 240, 0.6)", // 연한 파란색 테두리
              boxShadow: "4px 4px 10px rgba(50, 123, 240, 0.3)", // 파란색 계열 그림자 효과
            }}
            alt="멤버십 이미지"
          />
        </div>
        <div className="step-badge">step 2.</div>
        <div className="step-container">
          <h3>step 2. 결제 하기 </h3>

          <img
            src={step1Img2}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px", // 모서리를 둥글게 (10px 라운드)
              border: "3px solid rgba(50, 123, 240, 0.6)", // 연한 파란색 테두리
              boxShadow: "4px 4px 10px rgba(50, 123, 240, 0.3)", // 파란색 계열 그림자 효과
            }}
            alt="멤버십 이미지"
          />
        </div>

        <div className="step-badge">step 3.</div>
        <br />

        <div className="step-container">
          <h3>step 3. 구독 서비스 즐기기! </h3>
        </div>

        <div className="step-container">
          <h3>⚠️ 주의 사항 ⚠️</h3>
          <ul style={{ textAlign: "left" }}>
            <li>해당 상품은 만 19세 이상 고객만 가입할 수 있어요.</li>
            <li>신한 카드고객님이라면 누구나 가입할 수 있어요.</li>
            <li>
              이미 사용중인 구독 상품을 포함해서 조합 상품을 구매할 수는 없어요.
            </li>
            <li>
              중도 해지시에는 해지일까지는 사용할 수 있지만, 해당 월 이용요금은
              환불받을 수 없으니 양해 부탁드려요요
            </li>
            <li>
              구독 조합 상품을 이용하고 계신 고객님은 동일한 구독 서비스를
              포함한 조합은 가입할 수 없어요.
            </li>
          </ul>
        </div>

        <Selecteddrawer
          selectedSubscriptions={selected}
          toggleSubscription={toggleSubscription}
        />
      </div>
    </div>
  );
}
