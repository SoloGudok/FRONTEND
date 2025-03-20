import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import axios from "axios";
import "./MySubscription.css"; // 스타일 파일 추가

const API_BASE_URL = "http://localhost:8090/api/v1/subscription"; // API 주소

const MySubscription = () => {
  const { userId } = useParams(); // ✅ URL에서 userId 가져오기
  const [individualSubscriptions, setIndividualSubscriptions] = useState([]);
  const [combinationSubscriptions, setCombinationSubscriptions] = useState([]);
  const [switchStates, setSwitchStates] = useState(() => {
    return JSON.parse(localStorage.getItem("switchStates")) || {};
  });

  // ✅ API에서 구독 리스트 가져오는 함수
  useEffect(() => {
    if (!userId) return;

    const fetchSubscriptions = async () => {
      try {
        const [individualRes, combinationRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/individual`, { params: { userId } }),
          axios.get(`${API_BASE_URL}/combination`, { params: { userId } }),
        ]);

        console.log("📌 개별 구독 데이터:", individualRes.data); // ✅ 로그 추가
        console.log("📌 조합 구독 데이터:", combinationRes.data); // ✅ 로그 추가

        setIndividualSubscriptions(individualRes.data);
        setCombinationSubscriptions(combinationRes.data);
      } catch (err) {
        console.error("❌ 구독 정보를 불러오는 중 오류 발생:", err);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  // ✅ 스위치 토글 핸들러 (🚀 오류 해결)
  const handleSwitchToggle = (id) => {
    setSwitchStates((prevStates) => {
      const newStates = {
        ...prevStates,
        [id]: !prevStates[id],
      };
      localStorage.setItem("switchStates", JSON.stringify(newStates)); // ✅ 상태 저장
      console.log(`🛠️ 구독 ${id} 상태 변경:`, newStates[id]);
      return newStates;
    });
  };

  return (
    <div className="subscription-container">
      <h2>나의 구독 서비스 (User ID: {userId})</h2>

      {/* ✅ 개별 구독 서비스 리스트 */}
      <div className="subscription-list">
        {individualSubscriptions.map((sub) => (
          <div key={sub.id} className="subscription-item">
            <img
              src={
                `http://localhost:8090/static/subscription_img/${sub.imageUrl}` ||
                "/default-image.jpg"
              }
              alt={sub.name}
              className="subscription-logo"
            />
            <div className="subscription-info">
              <h3>{sub.name}</h3>
              <p>
                {sub.terminationDate
                  ? new Date(sub.terminationDate).toISOString().split("T")[0]
                  : "결제 정보 없음"}
              </p>
            </div>
            <Switch
              checked={switchStates[sub.id] || false}
              onChange={() => handleSwitchToggle(sub.id)} // ✅ 오류 해결
            />
          </div>
        ))}
      </div>

      {/* ✅ 조합 구독 서비스 리스트 */}
      <h2>나의 조합 구독 서비스</h2>
      <div className="subscription-list">
        {combinationSubscriptions.map((combo) => (
          <div key={combo.membershipId} className="subscription-item combo">
            <div className="subscription-icons">
              {combo.subscriptions.map((sub) => (
                <img
                  key={sub.id}
                  src={`http://localhost:8090/static/subscription_img/${sub.imageUrl}`}
                  alt={sub.name}
                  className="subscription-logo"
                />
              ))}
            </div>
            <div className="subscription-info">
              {/* <p>{combo.subscriptions.map((sub) => sub.name).join(" + ")}</p> */}
              <p>
                <p>
                  결제일:{" "}
                  {combo.terminationDate
                    ? new Date(combo.terminationDate)
                        .toISOString()
                        .split("T")[0]
                    : "정보 없음"}
                </p>
              </p>
            </div>
            <Switch
              checked={switchStates[combo.membershipId] || false}
              onChange={() => handleSwitchToggle(combo.membershipId)} // ✅ 오류 해결
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubscription;
