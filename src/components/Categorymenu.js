import React, { useState } from "react";
import { Button } from "@mui/material";
import "./Categorymenu.css"; // 스타일 분리

export default function Categorymenu() {
  const [selected, setSelected] = useState(0);

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

  return (
    <div className="category-container">
      {categories.map((cat, index) => (
        <button
          key={cat.id}
          onClick={() => setSelected(index)}
          className={`category-button ${selected === index ? "active" : ""}`}
        >
          <span className="emoji">{cat.emoji}</span> {cat.name}
        </button>
      ))}
    </div>
  );
}
