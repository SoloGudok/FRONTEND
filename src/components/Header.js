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
        {/* 
        <div id="header-menus">
          {/* 구독 서비스 메뉴 */}
          <Link to="/" id="header-menu1">
            구독 서비스
          </Link>

          {/* 카드 메뉴 */}
          <Link to="/cards" id="header-menu2">
            {" "}
            {/* /cards 경로로 이동 */}
            카드
          </Link>

          {/* 마이 메뉴 */}
          <Link to="/" id="header-menu3">
            마이
          </Link>

          {/* 혜택 메뉴 */}
          <Link to="/" id="header-menu4">
            혜택
          </Link>

          <a href="#">
            <div id="header-menu5">해지</div>
          </a>
        </div> */}
          {/* 해지 메뉴 */}
          <Link to="/" id="header-menu5">
            해지
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
