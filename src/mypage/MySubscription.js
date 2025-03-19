import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import axios from "axios";

import "./MySubscription.css"; // 스타일 파일 추가
// import { PieChart } from "@mui/x-charts/PieChart";

const API_BASE_URL = "http://localhost:8090/api/v1/subscription";

const MySubscription = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [individualSubscriptions, setIndividualSubscriptions] = useState([]);
  const [combinationSubscriptions, setCombinationSubscriptions] = useState([]);
  const [switchStates, setSwitchStates] = useState({});

  useEffect(() => {
    if (!userId) return;

    const fetchSubscriptions = async () => {
      try {
        const [individualRes, combinationRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/individual`, { params: { userId } }),
          axios.get(`${API_BASE_URL}/combination`, { params: { userId } }),
        ]);

        console.log("📌 개별 구독 데이터:", individualRes.data);
        console.log("📌 조합 구독 데이터:", combinationRes.data);

        // 🔹 구독이 만료된 항목은 제외
        const validIndividualSubs = individualRes.data.filter(
          (sub) =>
            !sub.terminationDate || new Date(sub.terminationDate) > new Date()
        );
        const validCombinationSubs = combinationRes.data.filter(
          (combo) =>
            !combo.terminationDate ||
            new Date(combo.terminationDate) > new Date()
        );

        setIndividualSubscriptions(validIndividualSubs);
        setCombinationSubscriptions(validCombinationSubs);

        // ✅ 스위치 상태 설정 (서버에서 받은 `isActive` 값 반영)
        setSwitchStates((prevStates) => {
          const newStates = { ...prevStates }; // 기존 상태 유지

          validIndividualSubs.forEach((sub) => {
            newStates[sub.id] = sub.isActive ?? true; // 기본값 true
          });
          validCombinationSubs.forEach((combo) => {
            newStates[combo.membershipId] = combo.isActive ?? true;
          });

          return newStates;
        });
      } catch (err) {
        console.error("❌ 구독 정보를 불러오는 중 오류 발생:", err);
      }
    };

    fetchSubscriptions();
  }, [userId]);

  const handleSwitchToggle = async (id, type, categoryId = null) => {
    if (!switchStates[id]) return; // 🔹 해지된 구독은 다시 ON 불가

    // 🔹 상태 업데이트 (동기 로직)
    setSwitchStates((prevStates) => {
      const newStates = {
        ...prevStates,
        [id]: false, // 🔹 OFF로 변경
      };
      console.log(`🛠️ 구독 ${id} 상태 변경:`, newStates[id]);

      return newStates; // 🔹 이 위치는 그대로 유지
    });

    // 🔹 API 호출 및 추가 로직 (비동기 로직)
    if (type === "individual") {
        navigate(`/mypage/cancelForm?subscription_id=${id}`);
    } 
    else if (type === "combo") {
        const combo = combinationSubscriptions.find(
          (combo) => combo.membershipId === id
        );

        if (combo) {
            const subscriptionIds = combo.subscriptions.map((sub) => sub.id);

            try {
                await axios.post(
                  "http://localhost:8090/api/v1/unsubscription/multi_cancel",
                  { subscriptionIds }
                );

                // 🔹 해지 성공 후 페이지 이동
                navigate(`/mypage/cancelCheck?id=${subscriptionIds.join(",")}`);
            } catch (error) {
                console.error("❌ 조합 구독 해지 실패:", error);
                alert("해지 요청에 실패했습니다. 다시 시도해주세요.");
            }
        }
    }
  };


  return (
    <div className="subscription-container">
      <h2>나의 구독중인 서비스</h2>

      {/* <h2>이번 달 소비내역</h2>
      <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: '구독' },
            { id: 1, value: 15, label: '총 소비' },
            
          ],
        },
      ]}
      width={400}
      height={200}
    /> */}
      <h2>나의 구독 서비스 (User ID: {userId})</h2>

      {/* ✅ 개별 구독 서비스 리스트 */}
      <div className="subscription-list">
        {individualSubscriptions.map((sub) => (
          <div key={sub.id} className="subscription-item">
            <img
              src={`${sub.imageUrl}` || "/default-image.jpg"}
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
              onChange={() => handleSwitchToggle(sub.id, "individual")}
              disabled={!switchStates[sub.id]} // 🔹 OFF 상태면 다시 ON 불가
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
                  src={sub.imageUrl}
                  alt={sub.name}
                  className="subscription-logo"
                />
              ))}
            </div>
            <div className="subscription-info">
              <p>
                결제일:{" "}
                {combo.terminationDate
                  ? new Date(combo.terminationDate).toISOString().split("T")[0]
                  : "정보 없음"}
              </p>
            </div>
            <Switch
              checked={switchStates[combo.membershipId] || false}
              onChange={() =>
                handleSwitchToggle(
                  combo.membershipId,
                  "combo"
                )
              }
              disabled={!switchStates[combo.membershipId]} // 🔹 OFF 상태면 다시 ON 불가
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubscription;
