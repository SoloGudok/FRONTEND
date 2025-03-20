import logo from "./img/logo1.png";
import "./Header.css";
import { Link, useLocation } from "react-router-dom"; // Link 컴포넌트 import
import { handleLogout } from "../login/axiosConfig";


const handleLoginOut = async () => {
  handleLogout();
}

const Header = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const isLoginPage = location.pathname === "/auth/login"; // 로그인 페이지인지 확인
  return (
    <header>
    {/* ✅ 로고를 왼쪽으로 배치 */}
    <div id="header-logo-image">
        <Link to="/">
          <img src={logo} alt="사이트 로고" />
        </Link>
      </div>

      {/* ✅ 로그아웃 버튼을 오른쪽으로 배치 */}
      {!isLoginPage && (
        <button className="logout-button" onClick={handleLoginOut}>
          로그아웃
        </button>
      )}
    </header>
  );
};

export default Header;
