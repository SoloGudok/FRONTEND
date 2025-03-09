import "./MenuFooter.css";
import React, { useEffect } from "react";
import footer1 from "./img/footer1.png";
import footer2 from "./img/footer2.png";
import footer3 from "./img/footer3.png";
import footer4 from "./img/footer4.png";
import footer5 from "./img/footer5.png";

const MenuFooter = () => {
  return (
    <div class="menu-footer">
      <div class="menu-footer-links">
        <a href="#">
          <div class="menu-footer-button">
            <div class="menu-footer-button-item">
              <div class="menu-footer-button-item-img">
                <img src={footer1} alt="구독 서비스" />{" "}
              </div>
              <div class="menu-footer-button-item-content">구독 서비스</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="menu-footer-button">
            <div class="menu-footer-button-item">
              <div class="menu-footer-button-item-img">
                <img src={footer2} alt="카드" />{" "}
              </div>
              <div class="menu-footer-button-item-content">카드</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="menu-footer-button">
            <div class="menu-footer-button-item">
              <div class="menu-footer-button-item-img">
                <img src={footer5} alt="메인" />{" "}
              </div>
              <div class="menu-footer-button-item-content">메인</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="menu-footer-button">
            <div class="menu-footer-button-item">
              <div class="menu-footer-button-item-img">
                <img src={footer3} alt="마이" />{" "}
              </div>
              <div class="menu-footer-button-item-content">마이</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="menu-footer-button">
            <div class="menu-footer-button-item">
              <div class="menu-footer-button-item-img">
                <img src={footer4} alt="혜택" />{" "}
              </div>
              <div class="menu-footer-button-item-content">혜택</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
export default MenuFooter;
