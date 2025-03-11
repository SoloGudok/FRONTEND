import React from "react";

function BenefitList({ categories, onCheckboxChange, selectedBenefits }) {
  return (
    <div>
      <h2>카테고리 선택</h2>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            value={category.id}
            checked={selectedBenefits.includes(category.id)} // 체크 상태
            onChange={onCheckboxChange} // 체크박스 상태 변경 시 호출
          />
          {category.emoji} {category.name}
        </label>
      ))}
    </div>
  );
}

export default BenefitList;
