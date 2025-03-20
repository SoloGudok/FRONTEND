import React from "react";
import "./VideoModal.css"; // 스타일 분리 가능

function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conten1" style={{ position: "relative" }}>
        {/* X 버튼 추가 */}
        <button
          onClick={onClose}
          className="close-button"
          style={{
            position: "absolute",
            top: "10px",
            right: "280px",
            background: "none",
            border: "none",
            fontSize: "16px",
            color: "white",
            cursor: "pointer",
            zIndex: 10, // 버튼을 위로 올리기
          }}
        >
          X
        </button>

        {/* Video */}
        <video width="50%" autoPlay>
          <source
            src={`${process.env.PUBLIC_URL}/video/Popup-modal.mp4`}
            type="video/mp4"
          />
          브라우저가 영상을 지원하지 않습니다.
        </video>
      </div>
    </div>
  );
}

export default VideoModal;
