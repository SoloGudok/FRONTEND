import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./UserCard.css";
import Modal from "react-modal";

// 모달의 루트 요소를 설정
Modal.setAppElement("#root");

export default function UserCard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cardImgUrls, setCardImgUrls] = useState([]);
  const [cardError, setCardError] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const goToCardList = () => {
    navigate("/cards");
    closeModal();
  };

  // 카드 선택 처리
  const selectCard = (index) => {
    setSelectedCardIndex(index);
    showPaymentToast(index);
  };

  // 결제 토스트 메시지 표시
  const showPaymentToast = (index) => {
    const toast = document.createElement("div");
    toast.className = "payment-toast";
    toast.textContent = `선택하신 카드로 결제가 진행됩니다`;
    document.body.appendChild(toast);

    // 토스트 애니메이션 효과
    setTimeout(() => {
      toast.className += " show";
    }, 10);

    // 3초 후 토스트 제거
    setTimeout(() => {
      toast.className = toast.className.replace(" show", "");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  };

  useEffect(() => {
    const userId = 1;

    if (userId !== 1) {
      setCardError("등록된 카드가 없습니다.");
      return;
    }

    axios
      .get(`http://localhost:8090/api/v1/user/card-imgs?userId=${userId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCardImgUrls(response.data);
          setCardError("");
        } else {
          setCardError("등록된 카드가 없습니다.");
        }
      })
      .catch((error) => {
        console.error("카드 이미지 가져오기 실패", error);
        setCardError("등록된 카드가 없습니다.");
      });
  }, []);

  // 모든 카드 데이터 (실제 카드 + 등록 카드)
  const getAllCards = () => {
    return [
      ...cardImgUrls.map((url, index) => ({
        type: "card",
        url: url,
        index: index,
      })),
      { type: "register", id: "register-card" },
    ];
  };

  return (
    <div className="payment-section">
      <h3 className="section-title">결제수단</h3>
      <h4 className="section-subtitle">카드</h4>

      <div className="usercard-container">
        {cardError && cardImgUrls.length === 0 ? (
          <div className="card-error">{cardError}</div>
        ) : (
          <Swiper
            slidesPerView={1.5}
            spaceBetween={20}
            centeredSlides={true}
            className="card-swiper"
          >
            {getAllCards().map((card, index) => (
              <SwiperSlide
                key={card.type === "card" ? `card-${index}` : card.id}
              >
                {card.type === "card" ? (
                  <div className="swiper-card-wrapper">
                    <img
                      src={card.url}
                      alt={`card-img-${card.index}`}
                      className={`usercard-img ${selectedCardIndex === card.index ? "selected" : ""}`}
                      onClick={() => selectCard(card.index)}
                    />
                  </div>
                ) : (
                  <div className="empty-card" onClick={openModal}>
                    <button className="add-button">+</button>
                    <h3>카드 등록</h3>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="등록된 카드 없음"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="overlay-image">
          <img
            src={require("../components/img/modaloverlay.png")}
            alt="Overlay"
          />
        </div>
        <div className="modal-content">
          <div className="modal-text">
            <h3>할인을 더 받을 수 있는 카드를 구경해보세요.</h3>
            <p>카드 추천을 받아보세요!</p>
            <div className="modal-actions">
              <button onClick={closeModal}>
                <strong>Back</strong>
              </button>
              <button onClick={goToCardList}>
                <strong>Go</strong>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
