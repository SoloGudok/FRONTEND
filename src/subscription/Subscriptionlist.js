import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fab, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Subscriptionlist.css";

export default function Subscriptionlist({
  subscriptions,
  selected,
  toggleSubscription,
}) {
  // 반응형 설정 추가
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ textAlign: "center" }}>{dots.slice(0, 5)}</div>
    ),
    responsive: [
      {
        breakpoint: 1024, // 1024px 이하일 때
        settings: {
          slidesToShow: 4, // 한 번에 4개 카드 표시
          slidesToScroll: 4, // 스크롤 시 4개씩 이동
        },
      },
      {
        breakpoint: 768, // 768px 이하일 때
        settings: {
          slidesToShow: 4, // 한 번에 3개 카드 표시
          slidesToScroll: 4, // 스크롤 시 3개씩 이동
        },
      },
      {
        breakpoint: 480, // 480px 이하일 때
        settings: {
          slidesToShow: 3, // 한 번에 2개 카드 표시
          slidesToScroll: 3, // 스크롤 시 2개씩 이동
        },
      },
    ],
    slidesToShow: 5, // 기본값 (1024px 초과일 때): 5개 카드 표시
    slidesToScroll: 5, // 기본값 (1024px 초과일 때): 스크롤 시 5개씩 이동
  };

  return (
    <Slider {...settings}>
      {subscriptions.map((sub) => (
        <Card
          key={sub.id}
          variant="outlined"
          className="shadow-lg hover:shadow-xl transition-all duration-200 mx-2 subscription-card"
          sx={{
            borderRadius: 8,
            maxWidth: 120,
            height: 150,
            padding: "12px",
            position: "relative",
            display: "block",
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
              position: "relative",
            }}
          >
            {/* 이미지 */}
            {sub.imageUrl && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "50%",
                }}
              >
                <img
                  src={sub.imageUrl}
                  alt={sub.name}
                  onClick={() => toggleSubscription(sub)}
                  className="subscription-img"
                  style={{
                    maxWidth: "40px",
                    maxHeight: "40px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {/* 텍스트 */}
            <p className="font-semibold text-sm subscription-name">
              {sub.name}
            </p>

            {/* 버튼 */}
            <div className="subscription-button">
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
                }}
              >
                <AddIcon sx={{ fontSize: 14 }} />
              </Fab>
            </div>
          </CardContent>
        </Card>
      ))}
    </Slider>
  );
}
