import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardAds.css"; // 스타일 별도 작성

function CardAds() {
  const [ads, setAds] = useState([]);

  // 1️⃣ 광고 설명 배열 (index 순서대로 매칭)
  const adDescriptions = [
    "신한카드로 OTT보고 캐시백 혜택을!",
    "자기계발 X 신한카드 최대 4000원 할인",
    "운동하면서 할인까지 받자 신한카드 콰트로",
    "25.3월 뷰티구독 할인이벤트",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/v1/card/cardadvertisements")
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => {
        console.error("광고 이미지 로드 실패", err);
      });
  }, []);

  return (
    <div className="card-ads-container">
      {ads.map((url, index) => (
        <div key={index} className="card-ad">
          <img
            src={url}
            alt={`광고 ${index + 1}`}
            className="card-ad-img"
            style={{ pointerEvents: "none" }} // 클릭 방지
          />
          <p className="card-ad-description">{adDescriptions[index]}</p>
        </div>
      ))}
    </div>
  );
}

export default CardAds;
