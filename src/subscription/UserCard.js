import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserCard() {
  const [cardImgUrls, setCardImgUrls] = useState([]); // 카드 이미지 URL
  const [cardError, setCardError] = useState(""); // 카드 이미지가 없을 때 에러 메시지

  useEffect(() => {
    const userId = 1; // 실제 userId를 넣거나 동적으로 할 수 있음

    // userId가 1이 아닐 때 에러 메시지 설정
    if (userId !== 1) {
      setCardError("등록된 카드가 없습니다.");
      return;
    }

    // userId가 1일 때 카드 이미지 가져오기
    axios
      .get(`http://localhost:8090/api/v1/user/card-imgs?userId=${userId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setCardImgUrls(response.data); // 카드 이미지 URL 업데이트
          setCardError(""); // 카드 이미지가 있으면 에러 메시지 초기화
        } else {
          setCardError("등록된 카드가 없습니다.");
        }
      })
      .catch((error) => {
        console.error("카드 이미지 가져오기 실패", error);
        setCardError("등록된 카드가 없습니다."); // API 오류 시에도 "등록된 카드가 없습니다." 메시지
      });
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div>
      <h1>내 카드 이미지</h1>
      {/* 카드 이미지가 있을 경우 */}
      {cardImgUrls.length > 0 ? (
        <div>
          <h3>카드 이미지</h3>
          {cardImgUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`card-img-${index}`}
              style={{
                width: "100px",
                height: "100px",
                margin: "5px",
              }}
            />
          ))}
        </div>
      ) : (
        <p>{cardError}</p> // 카드 이미지가 없을 때 에러 메시지
      )}
    </div>
  );
}
