import React from "react";
import "./Modal.css"; // 스타일

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링 하지 않음

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
