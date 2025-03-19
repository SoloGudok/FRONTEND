import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";
import Membership from "./subscription/membership";
import SubscriptionList from "./subscription/list";
import CardList from "./card/CardList"; // CardList 컴포넌트 import
import "./card/list.css";
import Event from "./others/Event";
import Payment from "./subscription/Payment";
import Detail from "./card/Detail";
import SubscriptionDetail from "./subscription/SubscriptionDetail"; // 🔴 (추가됨) 상세 페이지 추가
import MySubscription from "./mypage/MySubscription"; // 🔴 (추가됨)
import Login from "./login/Login";
import CancelForm from "./mypage/cancelForm";
import CancelCheck from "./mypage/cancelCheck";
import {handleLogout, isTokenExpired, refreshAccessToken } from "./login/axiosConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("accessToken"));

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        console.log("❌ [App] 액세스 토큰 없음, 로그아웃 처리");
        setIsAuthenticated(false);
        return;
      }

      if (isTokenExpired(token)) {
        console.log("⚠️ [App] 액세스 토큰 만료됨. 갱신 시도.");
        token = await refreshAccessToken();
      }

      if (token) {
        console.log("✅ [App] 로그인 상태 유지");
        setIsAuthenticated(true);
      } else {
        console.log("❌ [App] 모든 토큰 만료. 로그인 페이지 이동.");
        setIsAuthenticated(false);
        handleLogout(); // ✅ 모든 토큰이 만료되었을 경우 로그인 페이지 이동
      }
    };

    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 60000); // ✅ 1분마다 실행

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Layout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 기본 대시보드 */}
            {console.log(isAuthenticated + "어센티유효상태")}
            <Route index element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/category" element={<Category />} />
            {/* 카드 페이지 */}
            <Route path="/cards" element={<CardList />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/event" element={<Event />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route
              path="/subscriptions/:categoryId"
              element={<SubscriptionList />}
            />
            {/* 🔥 추가! */}
            <Route path="/payment" element={<Payment />} /> {/* ✅ 추가 */}
            <Route
              path="/subscription/:subscriptionId"
              element={<SubscriptionDetail />}
            />
            <Route
              path="/my-subscriptions/:userId"
              element={<MySubscription />}
            />
            <Route path="/mypage/cancelForm" element={<CancelForm />} />
            <Route path="/mypage/cancelCheck" element={<CancelCheck />} />
            {/* 🔥 추가! */}

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
