import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";

import Membership from "./subscription/membership";
import SubscriptionList from "./subscription/list";
import CardList from "./card/CardList"; // CardList 컴포넌트 import
import "./card/list.css";
import Payment from "./subscription/Payment";
import Event from "./others/Event";
import CancelForm from "./mypage/cancelForm";
import CancelCheck from "./mypage/cancelCheck";

import Detail from "./card/Detail"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Layout을 기본 레이아웃으로 설정 */}
          <Route path="/" element={<Layout />}>
            {/* 기본 대시보드 */}
            <Route index element={<Dashboard />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/category" element={<Category />} />
            {/* 카드 페이지 (CardList 컴포넌트를 /cards 경로로 설정) */}
            <Route path="/cards" element={<CardList />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/event" element={<Event />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route
              path="/subscriptions/:categoryId"
              element={<SubscriptionList />}
            />
            <Route path="/payment" element={<Payment />} /> {/* ✅ 추가 */}
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
