import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fab, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Subscriptionlist.css"; // 스타일 적용

export default function Subscriptionlist({
  subscriptions, // ✅ 추가
  selected,
  toggleSubscription,
}) {
  // ✅ 슬라이더 설정 추가
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ textAlign: "center" }}>{dots.slice(0, 5)}</div>
    ),
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
            maxWidth: 150,
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
