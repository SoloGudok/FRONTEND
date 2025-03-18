import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";
import SubscriptionList from "./subscription/list";
import CardList from "./card/CardList"; // CardList 컴포넌트 import
import "./card/list.css";
import Membership from "./subscription/membership";
import Payment from "./subscription/Payment";
import Event from "./others/Event";
import SubscriptionDetail from "./subscription/SubscriptionDetail"; // 🔴 (추가됨) 상세 페이지 추가
import MySubscription from "./mypage/MySubscription"; // 🔴 (추가됨)

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Layout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 기본 대시보드 */}
            <Route index element={<Dashboard />} />
            {/* 카테고리 페이지 */}
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
            <Route path="/payment" element={<Payment />} /> {/* ✅ 추가 */}
            <Route
              path="/subscription/:subscriptionId"
              element={<SubscriptionDetail />}
            />
            {/* 🔴 (추가됨) 나의 구독 페이지 추가 */}
            <Route
              path="/my-subscriptions/:userId"
              element={<MySubscription />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
