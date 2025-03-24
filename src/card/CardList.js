import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "./Card";
import CategoryCard from "./CategoryCard";
import "./CategoryCard.css";
import MenuFooter from "../components/MenuFooter";
import FilterCardList from "./FilterCardList";
import "./CardList.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PauseIcon from "@mui/icons-material/Pause";
import IconButton from "@mui/material/IconButton"; // IconButton 임포트
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CardAds from "./CardAds"; // 광고 카드 컴포넌트 임포트

function CardList() {
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // 슬라이드가 재생 중인지 여부

  useEffect(() => {
    const fetchFilteredCards = async () => {
      try {
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("categoryId", selectedCategory); // 단일 값만 추가
        }

        const response = await axios.get(
          "http://192.168.0.169:8090/api/v1/card/filter",
          { params }
        );
        setFilteredCards(response.data);
      } catch (error) {
        console.error("Error fetching filtered cards:", error);
      }
    };

    fetchFilteredCards();
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 호출

  // 슬라이드를 한 칸 뒤로 이동
  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // 슬라이드를 한 칸 앞으로 이동
  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // 슬라이드 일시 정지/재개
  const handlePause = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop(); // 슬라이드 멈추기
        setIsPlaying(false); // 정지 상태로 변경
      } else {
        swiper.autoplay.start(); // 슬라이드 재개
        setIsPlaying(true); // 재생 상태로 변경
      }
    }
  };

  return (
    <>
      <div class="title-left">내게 맞는 카드 찾기</div>
      <CategoryCard
        onCategorySelect={setSelectedCategory}
        className="category-menu"
      />

      {/* === FilterCardList 대신 직접 슬라이드 구현 === */}
      <Swiper
        id="filtered-cardlist-slide"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={-50}
        slidesPerView={2} // 1.5개 보여줌
        centeredSlides={true}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        speed={600}
        ref={swiperRef}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </Swiper>

      {/* === 슬라이드 컨트롤 버튼들 === */}
      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-2"
        style={{ marginBottom: "-10px", marginTop: "-30px" }}
      >
        {/* 이전 버튼 */}
        <IconButton
          onClick={goToPrevSlide}
          style={{
            padding: "26px",
            marginLeft: "-10px",
            color: "gray",
          }}
          disableRipple
        >
          <ChevronLeftIcon fontSize="medium" />
        </IconButton>

        {/* 일시 정지/재생 버튼 */}
        <IconButton
          onClick={handlePause}
          style={{
            opacity: 0.7,
            backgroundColor: "white",
            padding: "1px",
            marginLeft: "-30px",
            color: "gray",
          }}
        >
          {isPlaying ? (
            <PauseIcon fontSize="medium" />
          ) : (
            <PlayArrowIcon fontSize="medium" />
          )}
        </IconButton>

        {/* 현재 슬라이드 번호 */}
        <span
          className="text-lg font-semibold"
          style={{ position: "relative", opacity: 0.7, top: "0.9px" }}
        >
          {currentSlide} / {filteredCards.length}
        </span>

        {/* 다음 버튼 */}
        <IconButton
          onClick={goToNextSlide}
          style={{ backgroundColor: "white", padding: "1px", color: "gray" }}
        >
          <NavigateNextIcon fontSize="medium" />
        </IconButton>
      </div>
      <div class="title-left">진행중인 이벤트</div>
      <CardAds />
      <MenuFooter />
    </>
  );
}

export default CardList;
