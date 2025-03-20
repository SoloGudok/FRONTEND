import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserCard.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

// 모달의 루트 요소를 설정
Modal.setAppElement("#root");

export default function UserCard() {
  const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 열기/닫기 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [cardImgUrls, setCardImgUrls] = useState([]);
  const [cardError, setCardError] = useState("");
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 추적
  const openModal = () => setModalIsOpen(true); // 모달 열기
  const closeModal = () => setModalIsOpen(false); // 모달 닫기
  const closeSelectedCardModal = () => setSelectedCardModalIsOpen(false); // 선택된 카드 모달 닫기
  const [selectedCardModalIsOpen, setSelectedCardModalIsOpen] = useState(false); // 새 모달 열기/닫기 상태 관리
  const goToCardList = () => {
    navigate("/cards"); // /card-list로 이동
    closeModal(); // 모달 닫기
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
  }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행됨

  // 이미지 클릭 시 선택 처리
  const handleCardClick = (index) => {
    setSelectedCard(index); // 클릭된 카드의 인덱스를 상태로 저장
    setSelectedCardModalIsOpen(true); // 새 모달 열기
  };

  return (
    <div>
      <h3 style={{ textAlign: "left", marginLeft: "40px" }}>결제수단</h3>
      <h4 style={{ textAlign: "left", marginLeft: "40px" }}>카드</h4>

      {/* 카드 이미지가 있을 경우 렌더링 */}
      <div className="card-container" style={{ marginTop: "-45px" }}>
        <div className="card-wrapper">
          {cardImgUrls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`card-img-${index}`}
                className="card-img"
                onClick={() => handleCardClick(index)} //클릭 이벤트 처리
              />
            </div>
          ))}

          {/* 빈 카드 UI 추가 (카드 개수와 상관없이 항상 추가됨) */}
          <div className="empty-card" onClick={openModal}>
            <button className="add-button">+</button>
            <h3>카드 등록</h3>
          </div>
          {/* 선택된 카드 모달 */}
          <Modal
            isOpen={selectedCardModalIsOpen}
            onRequestClose={closeSelectedCardModal}
            contentLabel="카드 선택됨"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <h3>결제수단</h3>
              <p>카드가 선택되었습니다.</p>
              <div className="modal-actions1">
                <button onClick={closeSelectedCardModal}>
                  <strong>닫기</strong>
                </button>
              </div>
            </div>
          </Modal>

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
      </div>
    </div>
  );
}
