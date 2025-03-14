import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "./Card";
import SearchFilter from "./SearchFilter"; // 검색 UI import React from "react";
import { Sliders } from "lucide-react"; // 필터 아이콘
import "./FilterButton.css"; // 스타일 파일

const FilterButton = ({ onFilterClick }) => {
  return (
    <button className="filter-button" onClick={onFilterClick}>
      <Sliders className="filter-icon" /> 필터
    </button>
  );
};

export default FilterButton;
