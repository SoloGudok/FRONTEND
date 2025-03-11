import React from "react";
import "./card.css"; // 스타일 적용

function Card({ card }) {
  return (
    <div className="card">
      <div className="card-images">
        {/* 모든 이미지를 순회하며 표시 */}
        {card.cardImgs && card.cardImgs.length > 0 ? (
          card.cardImgs.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:8090/static/card_img/${img.cardImgUrl
                .split("/")
                .pop()}`} // ✅ 경로 수정
              alt={`Card Image ${index + 1}`}
              className="card-image"
            />
          ))
        ) : (
          <img
            src="/card_img/default.png"
            alt="Default Card"
            className="card-image"
          /> // ✅ 기본 이미지 추가
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{card.cardName}</h3>
        <p className="card-text">{card.shortDescription}</p>
      </div>
    </div>
  );
}

export default Card;
