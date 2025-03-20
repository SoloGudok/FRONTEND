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
import FirstPage from "./firstPage/FirstPage";
import { isTokenExpired, refreshAccessToken } from "./login/axiosConfig";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("accessToken"));

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        // console.log("[App] 액세스 토큰 없음, 로그아웃 처리");
        setIsAuthenticated(false);
        return;
      }

      if (isTokenExpired(token)) {
        // console.log("[App] 액세스 토큰 만료됨. 갱신 시도.");
        token = await refreshAccessToken();
      }

      if (token) {
        // console.log("[App] 로그인 상태 유지");
        setIsAuthenticated(true);
      } else {
        // console.log("[App] 모든 토큰 만료. 로그인 페이지 이동.");
        setIsAuthenticated(false);
      }
    };

    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 60000); // 1분마다 실행

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Layout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 기본 대시보드 */}
            <Route index element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />} />
            <Route path="/auth/login" element={isAuthenticated ? <Dashboard /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/detail" element={isAuthenticated ? <Detail /> : <Navigate to="/auth/login" />} />
            <Route path="/category" element={isAuthenticated ? <Category /> : <Navigate to="/auth/login" />} />
            {/* 카드 페이지 */}
            <Route path="/cards" element={isAuthenticated ? <CardList /> : <Navigate to="/auth/login" />} />
            <Route path="/membership" element={isAuthenticated ? <Membership /> : <Navigate to="/auth/login" />} />
            <Route path="/event" element={isAuthenticated ? <Event /> : <Navigate to="/auth/login" />} />
            <Route path="/subscriptions" element={isAuthenticated ? <SubscriptionList /> : <Navigate to="/auth/login" />} />
            <Route
              path="/subscriptions/:categoryId"
              element={isAuthenticated ? <SubscriptionList /> : <Navigate to="/auth/login" />}
            />
            <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/auth/login" />} />
            <Route
              path="/subscription/:subscriptionId"
              element={isAuthenticated ? <SubscriptionDetail /> : <Navigate to="/auth/login" />}
            />
            <Route
              path="/my-subscriptions/:userId"
              element={isAuthenticated ? <MySubscription /> : <Navigate to="/auth/login" />}
            />
            <Route path="/mypage/cancelForm" element={isAuthenticated ? <CancelForm /> : <Navigate to="/auth/login" />} />
            <Route path="/mypage/cancelCheck" element={isAuthenticated ? <CancelCheck /> : <Navigate to="/auth/login" />} />
            <Route path="/firstPage" element={<FirstPage/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
