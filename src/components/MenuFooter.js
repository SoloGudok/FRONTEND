import "./MenuFooter.css";
import React from "react";
import footer1 from "./img/footer1.png";
import footer2 from "./img/footer2.png";
import footer3 from "./img/footer3.png";
import footer4 from "./img/footer4.png";
import footer5 from "./img/footer5.png";

const MenuFooter = () => {
  return (
    <div className="menu-footer">
      <div className="menu-footer-links">
        <a href="/subscriptions">
          <span className="menu-footer-button">
            <span className="menu-footer-button-item">
              <span className="menu-footer-button-item-img">
                <img src={footer1} alt="구독 서비스" />{" "}
              </span>
              <span className="menu-footer-button-item-content">
                구독 서비스
              </span>
            </span>
          </span>
        </a>

        <a href="/cards">
          <span className="menu-footer-button">
            <span className="menu-footer-button-item">
              <span className="menu-footer-button-item-img">
                <img src={footer2} alt="카드" />{" "}
              </span>
              <span className="menu-footer-button-item-content">카드</span>
            </span>
          </span>
        </a>

        <a href="/">
          <span className="menu-footer-button">
            <span className="menu-footer-button-item">
              <span className="menu-footer-button-item-img">
                <img src={footer5} alt="메인" />
              </span>
              <span className="menu-footer-button-item-content">메인</span>
            </span>
          </span>
        </a>

        <a href="/my-subscription/1">
          <span className="menu-footer-button">
            <span className="menu-footer-button-item">
              <span className="menu-footer-button-item-img">
                <img src={footer3} alt="마이" />{" "}
              </span>
              <span className="menu-footer-button-item-content">마이</span>
            </span>
          </span>
        </a>

        <a href="/event">
          <span className="menu-footer-button">
            <span className="menu-footer-button-item">
              <span className="menu-footer-button-item-img">
                <img src={footer4} alt="혜택" />
              </span>
              <span className="menu-footer-button-item-content">혜택</span>
            </span>
          </span>
        </a>
      </div>
    </div>
  );
};
export default MenuFooter;
