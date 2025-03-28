import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";
import Membership from "./subscription/membership";
import SubscriptionList from "./subscription/list";
import CardList from "./card/CardList"; // CardList 컴포넌트 import
import "./card/CardList.css";
import Event from "./others/Event";
import Payment from "./subscription/Payment";
import Detail from "./card/Detail";
import SubscriptionDetail from "./subscription/SubscriptionDetail"; // 🔴 (추가됨) 상세 페이지 추가
import MySubscription from "./mypage/MySubscription"; // 🔴 (추가됨)
import CancelForm from "./mypage/cancelForm";
import CancelCheck from "./mypage/cancelCheck";
import FirstPage from "./firstPage/FirstPage";
import ExpenditureList from "./main/ExpenditureList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          Layout을 기본 레이아웃으로 설정
          <Route path="/" element={<Layout />}>
            {/* 기본 대시보드 */}
            <Route index element={<Dashboard />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/expenditure" element={<ExpenditureList />} />
            <Route path="/cards" element={<CardList />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/event" element={<Event />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route
              path="/subscriptions/:categoryId"
              element={<SubscriptionList />}
            />
            <Route path="/payment" element={<Payment />} />
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
            <Route path="/firstpage" element={<FirstPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
