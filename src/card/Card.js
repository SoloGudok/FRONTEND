import React, { useEffect, useState } from "react";
import "./card.css"; // 스타일 적용
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 이미지 출력 함수
const renderImages = (cardImgs) => {
  if (cardImgs && cardImgs.length > 0) {
    return cardImgs.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:8090/static/card_img/${img.cardImgUrl
          .split("/")
          .pop()}`} // ✅ 경로 수정
        alt={`Card Image ${index + 1}`}
        className="card-image"
      />
    ));
  }
  return (
    <img
      src="/card_img/default.png"
      alt="Default Card"
      className="card-image"
    /> // ✅ 기본 이미지 추가
  );
};

// 새로운 이미지 출력 함수 (allcard 클래스명 사용)
const renderAllCardImages = (cardImgs) => {
  if (cardImgs && cardImgs.length > 0) {
    return cardImgs.map((img, index) => (
      <img
        key={index}
        src={`http://localhost:8090/static/card_img/${img.cardImgUrl
          .split("/")
          .pop()}`} // ✅ 경로 수정
        alt={`All Card Image ${index + 1}`}
        className="allcard-image" // allcard 클래스명
      />
    ));
  }
  return (
    <img
      src="/card_img/default.png"
      alt="All Default Card"
      className="allcard-image" // allcard 클래스명
    />
  );
};

function Card({ card, isAllCard = false }) {
  //hyenho 추가
  const navigate = useNavigate();
  const handleCardImageClick = () => {
    // console.log(card);
    try {
      const selectedCard = {
        name: card.cardName, // 카드 이름
        shortDescription: card.shortDescription, // 쇼츠 내용
        description: card.description, // 상세 내용
        imageUrl: card.cardImgs[0].cardImgUrl, // 이미지 URL
        createdAt: card.createdAt,
      };

      navigate("/detail", { state: selectedCard });
      window.location.reload();
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };
  //hyenho 추가 끝

  return (
    <div className="card">
      <div
        className="card-images"
        onClick={() => {
          handleCardImageClick();
        }}
      >
        {isAllCard
          ? renderAllCardImages(card.cardImgs)
          : renderImages(card.cardImgs)}{" "}
        {/* 조건에 따라 이미지 출력 함수 선택 */}
      </div>

      <h3 className="card-title">{card.cardName}</h3>
      <p className="card-text">{card.shortDescription}</p>
    </div>
  );
}

export default Card;
