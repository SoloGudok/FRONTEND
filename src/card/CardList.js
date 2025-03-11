import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "./Card";
import SearchFilter from "./SearchFilter"; // 검색 UI
import BenefitList from "./BenefitList"; // 새로 만든 BenefitList 컴포넌트
import "./list.css";

function CardList() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  // 예시 카테고리 데이터 (백엔드에서 받아올 수 있음)
  const categories = [
    { id: 1, name: "헬스케어", emoji: "💳" },
    { id: 2, name: "홈/라이프", emoji: "⛽" },
    { id: 3, name: "게임", emoji: "🛒" },
    { id: 4, name: "IT", emoji: "🏪" },
    { id: 5, name: "식품", emoji: "🛍️" },
    { id: 6, name: "자기개발", emoji: "" },
    { id: 7, name: "뷰티티", emoji: "💄" },
    // 필요에 따라 추가
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/v1/card/with-images-and-category/json")
      .then((response) => {
        console.log(response.data); // 받은 데이터를 확인
        setCards(response.data); // CardDTO 배열을 저장
        setFilteredCards(response.data);
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 카드 필터링
    const filtered = cards.filter((card) =>
      card.cardName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  const handleFilterClick = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (event) => {
    const benefitId = parseInt(event.target.value);
    setSelectedBenefits((prev) =>
      prev.includes(benefitId)
        ? prev.filter((id) => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const applyFilters = () => {
    if (selectedBenefits.length === 0) {
      setFilteredCards(cards);
    } else {
      setFilteredCards(
        cards.filter((card) => selectedBenefits.includes(card.category_id))
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="card-list-container">
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterClick={handleFilterClick}
      />

      {/* 모달에 BenefitList 컴포넌트 삽입 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <BenefitList
              categories={categories}
              onCheckboxChange={handleCheckboxChange}
              selectedBenefits={selectedBenefits}
            />
            <button onClick={applyFilters}>적용</button>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
      <button className="filter-button" onClick={handleFilterClick}>
        필터
      </button>
    </div>
  );
}

export default CardList;
