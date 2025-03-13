import React, { useState } from "react";
import "./Categorymenu.css"; // 스타일 분리

export default function Categorymenu({ setSelectedCategory }) {
  const [selectedCategory, setSelectedCategoryState] = useState(null); // 단일 선택

  const categories = [
    { id: 1, name: "헬스케어", emoji: "🏃‍♂️‍➡️" },
    { id: 2, name: "홈/라이프", emoji: "🏠" },
    { id: 3, name: "게임", emoji: "🎮" },
    { id: 4, name: "IT", emoji: "💻" },
    { id: 5, name: "식품", emoji: "🍽️" },
    { id: 6, name: "자기개발", emoji: "🛠️" },
    { id: 7, name: "뷰티", emoji: "💄" },
    { id: 8, name: "영상", emoji: "🎥" },
    { id: 9, name: "음악", emoji: "🎵" },
    { id: 10, name: "도서", emoji: "📚" },
  ];

  const handleCategoryClick = (categoryId) => {
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;
    setSelectedCategoryState(newSelectedCategory); // 내부 상태 업데이트
    setSelectedCategory(newSelectedCategory); // 부모 컴포넌트로 전달
  };

  return (
    <div className="category-container">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`category-button ${
            selectedCategory === cat.id ? "active" : ""
          }`}
        >
          <span className="emoji">{cat.emoji}</span> {cat.name}
        </button>
      ))}
    </div>
  );
}
