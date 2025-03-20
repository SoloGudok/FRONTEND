import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import Card from "./Card";
import "./FilterCardList.css";

function FilterCardList({ filteredCards }) {
  return (
    <div className="filtered-card-list-container">
      {filteredCards.length > 0 ? (
        <Swiper
          modules={[EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 70,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
        >
          {filteredCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}

export default FilterCardList;
