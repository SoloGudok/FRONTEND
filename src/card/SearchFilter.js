import React from "react";
import { FiSearch } from "react-icons/fi"; // 검색 아이콘
import { Sliders } from "lucide-react"; // 필터 아이콘
import "./SearchFilter.css"; // 스타일 파일

const SearchFilter = ({ searchTerm, setSearchTerm, onFilterClick }) => {
  return (
    <div className="search-filter">
      {/* 검색 아이콘과 입력 필드 */}
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="원하는 카드를 찾아보세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력 시 상태 업데이트
      />

      {/* 필터 버튼 (텍스트 제거) */}
      <button className="filter-button" onClick={onFilterClick}>
        <Sliders className="filter-icon" />
      </button>
    </div>
  );
};

export default SearchFilter;
