import logo from "./img/logo1.png";
import "./Header.css";
import { Link } from "react-router-dom"; // Link 컴포넌트 import

const Header = () => {
  return (
    <header>
      <div id="header">
        <div id="header-logo-image">
          {/* 홈 화면으로 이동 */}
          <Link to="/">
            <img src={logo} alt="사이트 로고" />
          </Link>
        </div>

        {/* 기존 주석을 제거하고 해지 메뉴만 남기기 */}
        <Link to="/" id="header-menu5">
          해지
        </Link>
      </div>
    </header>
  );
};

export default Header;
