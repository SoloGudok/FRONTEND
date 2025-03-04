import "./Footer.css";
import React, { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".footer-button");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const content = this.nextElementSibling;

        // 다른 버튼 닫기
        buttons.forEach((btn) => {
          if (btn !== this) {
            btn.classList.remove("active");
            btn.nextElementSibling.style.display = "none";
          }
        });

        // 현재 버튼 토글
        if (content.style.display === "block") {
          content.style.display = "none";
          this.classList.remove("active");
        } else {
          content.style.display = "block";
          this.classList.add("active");
        }
      });
    });

    // Cleanup 함수 (이벤트 리스너 제거)
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
    };
  }, []);
  return (
    <footer>
      <div class="footer-links">
        <a href="https://www.shinhan.com/hpe/index.jsp#050404040000">
          개인정보처리방침
        </a>
        <a href="https://www.shinhan.com/hpe/index.jsp#050404030000">
          신용정보활용체제
        </a>
        <a href="https://www.shinhan.com/hpe/index.jsp#050202010000">
          전자민원
        </a>
        <a href="https://bank.shinhan.com/index.jsp?cr=020108040000">
          보호금융상품등록부
        </a>
        <a href="https://www.shinhan.com/hpe/index.jsp#050504010000">
          상품공시실
        </a>
      </div>

      <div class="footer-item">
        <button class="footer-button">웹접근성이용안내</button>
        <div class="footer-content">
          <p>
            웹 접근성 관련하여 신한은 다양한 서비스를 제공합니다. 자세한 사항은
            <a href="https://www.shinhan.com/index.jsp"> 신한 홈페이지</a>로
            문의하세요.
          </p>
        </div>
      </div>

      <div class="footer-item">
        <button class="footer-button">위치기반서비스약관</button>
        <div class="footer-content">
          <p>위치 기반 서비스를 이용하려면 관련 약관을 확인해 주세요.</p>
        </div>
      </div>
      <div class="footer-item">
        고객센터 1599-8000 평일 09:00~18:00 (은행휴무일 제외)
      </div>
      <div class="footer-item">© SHINHAN BANK. All rights reserved.</div>
    </footer>
  );
};
export default Footer;
