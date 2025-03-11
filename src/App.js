import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";
import CardList from "./card/CardList"; // CardList 컴포넌트 import
import "./card/list.css";

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
            {/* 카드 페이지 (CardList 컴포넌트를 /cards 경로로 설정) */}
            <Route path="/cards" element={<CardList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
