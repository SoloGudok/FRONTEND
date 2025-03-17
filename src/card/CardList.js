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
import "./list.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PauseIcon from "@mui/icons-material/Pause";
import IconButton from "@mui/material/IconButton"; // IconButton 임포트
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function CardList() {
  const [filteredCards, setFilteredCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // 슬라이드가 재생 중인지 여부

  useEffect(() => {
    const allCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/card/filter"
        );
        setAllCards(response.data);
      } catch (error) {
        console.error("Error fetching filtered cards:", error);
      }
    };
    allCards();
  }, []);

  useEffect(() => {
    const fetchFilteredCards = async () => {
      try {
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("categoryId", selectedCategory); // 단일 값만 추가
        }

        const response = await axios.get(
          "http://localhost:8090/api/v1/card/filter",
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
      <Swiper
        id="cardlist-slide"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        speed={600}
        ref={swiperRef}
      >
        {allCards.length > 0 ? (
          allCards.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </Swiper>

      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-2"
        style={{ marginBottom: "-10px", marginTop: "-30px" }}
      >
        {/* 이전 버튼 */}
        <IconButton
          onClick={goToPrevSlide}
          style={{
            backgroundColor: "white",
            padding: "26px",
            marginLeft: "-10px",
            color: "gray",
          }}
        >
          <ChevronLeftIcon fontSize="medium" />
        </IconButton>

        {/* 일시 정지/재개 버튼 */}
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

        <span
          className="text-lg font-semibold"
          style={{ position: "relative", opacity: 0.7, top: "0.9px" }}
        >
          {currentSlide} / {allCards.length}
        </span>

        {/* 다음 버튼 */}
        <IconButton
          onClick={goToNextSlide}
          style={{ backgroundColor: "white", padding: "1px", color: "gray" }}
        >
          <NavigateNextIcon fontSize="medium" />
        </IconButton>
      </div>

      <CategoryCard
        onCategorySelect={setSelectedCategory}
        className="category-menu"
      />

      <FilterCardList
        filteredCards={filteredCards}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        className="filter-card-list"
      />
      <MenuFooter />
    </>
  );
}

export default CardList;
