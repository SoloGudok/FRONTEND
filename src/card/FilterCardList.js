import React from "react";
import Card from "./Card"; // Card 컴포넌트 임포트
import "./FilterCardList.css";

function FilterCardList({ filteredCards }) {
  return (
    <div className="filtered-card-list-container">
      <div className="card-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="card-item">
              <Card card={card} />
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default FilterCardList;
