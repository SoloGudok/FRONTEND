import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Dashboard from "./main/dashboard";
import Category from "./main/category";
import Membership from "./subscription/membership";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/membership" element={<Membership />} />
            {/* 🔥 추가! */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
