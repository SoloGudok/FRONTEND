import React from 'react';

export function Card({ name, price, imageUrl }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
      {/* 이미지 추가 */}
      <img src={imageUrl} alt={name} className="w-20 h-20 rounded-md mb-2" />
      {/* 텍스트 정보 */}
      <div className="text-lg font-bold">{name}</div>
      <div className="text-sm text-gray-500">{price.toLocaleString()}원 / 월</div>
    </div>
  );
}
