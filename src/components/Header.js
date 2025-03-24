import logo from "./img/logo1.png";
import "./Header.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Link 컴포넌트 import
import { handleLogout } from "../login/axiosConfig";

const handleLoginOut = async () => {
  handleLogout();
};

// 로고 컴포넌트 - 실제 로고로 교체하세요
const Logo = () => (
  <Typography level="h4" component="div" className="logo">
    <Link to="/dashboard">
      <img src={logo} alt="사이트 로고" />
    </Link>
  </Typography>
);

const Header = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const location = useLocation(); // 현재 경로 가져오기
  const isLoginPage = location.pathname === "/auth/login"; // 로그인 페이지인지 확인
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  const handleLogin = () => {
    navigate("/auth/login"); // ✅ /subscriptions 페이지로 이동
  };

  return (
    <header>
      {/* ✅ 로고를 왼쪽으로 배치 */}
      <div id="header-logo-image">
        <Link to="/dashboard">
          <img src={logo} alt="사이트 로고" />
        </Link>
      </div>

      {accessToken
        ? !isLoginPage && (
            <button className="logout-button" onClick={handleLoginOut}>
              로그아웃
            </button>
          )
        : !isLoginPage && (
            <button className="logout-button" onClick={handleLogin}>
              로그인
            </button>
          )}

      {/* ✅ 로그아웃 버튼을 오른쪽으로 배치 */}
      {/* {!isLoginPage && (
        <button className="logout-button" onClick={handleLoginOut}>
          로그아웃
        </button>
      )} */}
    </header>
  );
};

export default Header;
