import React, { useState } from "react";
import "./Categorymenu.css"; // 스타일 분리

export default function Categorymenu({ onCategorySelect }) {
  const [selected, setSelected] = useState(0); // 기본값 0(전체)

  const categories = [
    { id: 0, name: "전체", emoji: "🔍" }, // 전체 카테고리 추가
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
    console.log(`카테고리 ID 선택: ${categoryId}`);
    setSelected(categoryId);
    onCategorySelect(categoryId); // 부모 컴포넌트에 선택된 카테고리 ID 전달
  };

  return (
    <div className="category-container">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`category-button ${selected === cat.id ? "active" : ""}`}
        >
          <span className="emoji">{cat.emoji}</span> {cat.name}
        </button>
      ))}
    </div>
  );
}
