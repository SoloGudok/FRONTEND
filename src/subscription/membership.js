import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick"; // Slider 임포트
import "slick-carousel/slick/slick.css"; // 슬릭 스타일 임포트
import "slick-carousel/slick/slick-theme.css"; // 슬릭 테마 스타일 임포트
import Categorymenu from "../components/Categorymenu";
import { Fab, Card, CardContent } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Membership() {
  const [subscriptions, setSubscriptions] = useState([]); // 백엔드에서 구독 리스트 가져오기
  const [selected, setSelected] = useState([]);

  // 1️⃣ 백엔드에서 구독 서비스 목록 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/v1/subscription") // 백엔드 주소 맞춰서 수정!
      .then((response) => {
        console.log("구독 데이터:", response.data); // ✅ 콘솔에서 데이터 확인
        setSubscriptions(response.data);
      })
      .catch((error) => console.error("구독 목록 가져오기 실패", error));
  }, []);

  // 2️⃣ 구독 서비스 선택 API 호출
  const toggleSubscription = (subscription) => {
    setSelected((prev) => {
      const isSelected = prev.some((s) => s.id === subscription.id);

      if (isSelected) {
        // ✅ 선택 취소: DELETE 요청 보내기
        axios
          .delete(
            `http://localhost:8090/api/v1/subscription/unselect/${subscription.id}` // 수정된 부분
          )
          .then(() => console.log("구독 선택 취소 성공"))
          .catch((error) => console.error("구독 선택 취소 실패", error));

        return prev.filter((s) => s.id !== subscription.id); // 리스트에서 제거
      }

      if (prev.length < 3) {
        // ✅ 선택: POST 요청 보내기
        const subscriptionIds = [...prev.map((s) => s.id), subscription.id];
        axios
          .post(
            "http://localhost:8090/api/v1/subscription/select",
            subscriptionIds
          )
          .then(() => console.log("구독 선택 성공"))
          .catch((error) => console.error("구독 선택 실패", error));

        return [...prev, subscription]; // 선택 리스트에 추가
      }

      return prev;
    });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 화면에 3개의 아이템을 표시
    slidesToScroll: 1,
    // dots: true, // ✅ 도트 활성화
    // arrows: false, // ✅ 화살표 제거
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1>구독 리스트1!!!!</h1>
      <Categorymenu />
      <Slider {...settings}>
        {subscriptions.map((sub) => (
          <Card
            key={sub.id}
            variant="outlined"
            className="shadow-lg hover:shadow-xl transition-all duration-200 mx-2"
            sx={{
              borderRadius: 8, // ✅ 모서리 둥글기 (기본 4, 더 크게 가능)
              maxWidth: 150, // 카드 최대 너비
              height: 150, // 카드 높이 고정
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // 내용 간 간격 유지
              alignItems: "center",
              padding: "12px",
              position: "relative", // ✅ Fab 버튼 위치 고정을 위해 relative 추가
            }}
          >
            <CardContent className="p-3 text-center">
              {/* 이미지 추가 */}
              {sub.imageUrl && (
                <img
                  src={`http://localhost:8090/static/subscription_img/${sub.imageUrl}`}
                  alt={sub.name}
                  onClick={() => toggleSubscription(sub)}
                  className="w-1/2 h-auto object-cover mb-2"
                  style={{
                    maxWidth: "40px",
                    maxHeight: "40px",
                    margin: "0 auto",
                  }}
                />
              )}

              <p className="font-semibold text-sm">{sub.name}</p>

              <Fab
                size="small"
                color={
                  selected.some((s) => s.id === sub.id) ? "primary" : "inherit"
                }
                aria-label="add"
                onClick={() => toggleSubscription(sub)}
                sx={{
                  width: 25,
                  height: 25,
                  minHeight: "unset",
                  position: "absolute",
                  bottom: 8,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <AddIcon sx={{ fontSize: 14 }} />
              </Fab>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </div>
  );
}
