import logo from "./img/logo1.png";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div id="header">
        <div id="header-logo-image">
          <a href="/">
            <img src={logo} />
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
