import React, { useEffect, useState } from "react";

import axios from "axios"; // ✅ axios 불러오기
import { Swiper, SwiperSlide } from "swiper/react"; // ✅ Swiper 불러오기
import "swiper/css"; // ✅ Swiper 기본 스타일
import "swiper/css/navigation"; // ✅ 네비게이션 (이전/다음 버튼)
import "swiper/css/pagination"; // ✅ 페이지네이션 (하단 점 표시)
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // ✅ Swiper 기능 추가
import styles from "./CardListComponent.module.css"; // ✅ CSS 모듈 불러오기
function CardListComponent() {
  const [cards, setCards] = useState([]); // ✅ 카드 데이터를 저장할 상태

  // ✅ 카드 데이터 가져오는 함수
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+"/api/v1/card/filter") // ✅ 엔드포인트 변경
      .then((response) => {
        console.log("✅ API 응답 데이터:", response.data);
        setCards(response.data);
      })
      .catch((error) => {
        console.error("❌ 카드 정보를 가져오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div className={styles.cardListContainer}>
      {" "}
      {/* ✅ CSS 모듈 적용 */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10} // 모바일에서는 간격을 좁게
        slidesPerView="auto" // 자동으로 적절한 수의 슬라이드 표시
        navigation={window.innerWidth > 768} // 모바일에서는 내비게이션 버튼 숨김
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }} // 페이지네이션 활성화
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1.5, // 모바일에서는 1개 슬라이드와 다음 슬라이드 힌트
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
      >
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <SwiperSlide
              key={index}
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div className={styles.cardImages}>
                {card.cardImgs && card.cardImgs.length > 0 ? (
                  card.cardImgs.map((img, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={`${process.env.REACT_APP_API_URL}/static/card_img/${img.cardImgUrl
                        .split("/")
                        .pop()}`}
                      alt={`Card Image ${imgIndex + 1}`}
                      className={styles.cardImage}
                    />
                  ))
                ) : (
                  <img
                    src="/card_img/default.png"
                    alt="Default Card"
                    className={styles.cardImage}
                  />
                )}
              </div>
              <h3 className={styles.cardTitle}>{card.cardName}</h3>
              <p className={styles.cardText}>{card.shortDescription}</p>
            </SwiperSlide>
          ))
        ) : (
          <p className="empty-message">카드 정보를 불러오는 중...</p>
        )}
      </Swiper>
    </div>
  );
}

export default CardListComponent;
