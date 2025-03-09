import logo from "./img/logo1.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div id="header">
        <div id="header-logo-image">
          <a href="#">
            <img src={logo} />
          </a>
        </div>
        {/* 
        <div id="header-menus">
          <a href="#">
            <div id="header-menu1">구독 서비스</div>
          </a>

          <a href="#">
            <div id="header-menu2">카드</div>
          </a>

          <a href="#">
            <div id="header-menu3">마이</div>
          </a>

          <a href="#">
            <div id="header-menu4">혜택</div>
          </a>

          <a href="#">
            <div id="header-menu5">해지</div>
          </a>
        </div> */}
      </div>
    </header>
  );
};
export default Header;
