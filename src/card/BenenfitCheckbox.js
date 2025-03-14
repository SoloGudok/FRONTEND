import React, { useState } from "react";
import Modal from "./Modal"; // 모달 컴포넌트
import { FiCheckCircle } from "react-icons/fi"; // 체크 아이콘

// benefit prop: { id, name, emoji } 형태의 객체를 전달받음
const BenefitCheckbox = ({ benefit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked); // 체크박스 상태 업데이트
    setIsModalOpen(checked); // 체크되면 모달 열기, 해제되면 닫기
  };

  return (
    <div>
      {/* 체크박스와 라벨 */}
      <label
        htmlFor={`benefitDetail${benefit.id}`}
        className="check_btn col col4 f_left"
      >
        <input
          type="checkbox"
          id={`benefitDetail${benefit.id}`}
          name="benefitDetail"
          value={benefit.id} // 백엔드에서 받은 category_id 사용
          className="set_AutoComplete"
          autoComplete="off"
          checked={isChecked}
          onChange={handleCheckboxChange} // 체크박스 변경 시 호출되는 함수
        />
        <span role="text">
          <FiCheckCircle /> {benefit.name}
          {benefit.emoji && (
            <span className="pop_select_emoji" aria-hidden="true">
              {benefit.emoji}
            </span>
          )}
        </span>
      </label>

      {/* 모달 컴포넌트 */}
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <h2>{benefit.name} 혜택 상세 정보</h2>
        <p>
          여기서 {benefit.name} 관련 카드 혜택 상세 정보를 확인하실 수 있습니다.
        </p>
        <button onClick={() => setIsModalOpen(false)}>닫기</button>
      </Modal>
    </div>
  );
};

export default BenefitCheckbox;
