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
          <div className="menu-footer-button">
            <div className="menu-footer-button-item">
              <div className="menu-footer-button-item-img">
                <img src={footer1} alt="구독 서비스" />{" "}
              </div>
              <div className="menu-footer-button-item-content">구독 서비스</div>
            </div>
          </div>
        </a>

        <a href="/cards">
          <div className="menu-footer-button">
            <div className="menu-footer-button-item">
              <div className="menu-footer-button-item-img">
                <img src={footer2} alt="카드" />{" "}
              </div>
              <div className="menu-footer-button-item-content">카드</div>
            </div>
          </div>
        </a>

        <a href="/">
          <div className="menu-footer-button">
            <div className="menu-footer-button-item">
              <div className="menu-footer-button-item-img">
                <a href="/">
                  <img src={footer5} alt="메인" />
                </a>
              </div>
              <div className="menu-footer-button-item-content">메인</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div className="menu-footer-button">
            <div className="menu-footer-button-item">
              <div className="menu-footer-button-item-img">
                <img src={footer3} alt="마이" />{" "}
              </div>
              <div className="menu-footer-button-item-content">마이</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div className="menu-footer-button">
            <div className="menu-footer-button-item">
              <div className="menu-footer-button-item-img">
                <a href="/event">
                  <img src={footer4} alt="혜택" />
                </a>
              </div>
              <div className="menu-footer-button-item-content">혜택</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default MenuFooter;
