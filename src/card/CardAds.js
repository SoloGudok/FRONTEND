import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardAds.css"; // 스타일 별도 작성
import { Link } from "react-router-dom"; // Link import
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
      .get(process.env.REACT_APP_API_URL+"/api/v1/card/cardadvertisements")
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
          <Link to="/event">
            {" "}
            {/* 이미지 클릭 시 /event 페이지로 이동 */}
            <img src={url} alt={`광고 ${index + 1}`} className="card-ad-img" />
          </Link>
          <p className="card-ad-description">{adDescriptions[index]}</p>
        </div>
      ))}
    </div>
  );
}

export default CardAds;
