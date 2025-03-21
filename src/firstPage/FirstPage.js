import React from "react";
import { Link } from "react-router-dom";
import "./FirstPage.css"; // CSS 파일 연결

const FirstPage = () => {
    return (
      <div 
        className="firstpage-background"
        style={{
          backgroundImage: `url("https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/FirstPage.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "1000px",
          opacity: "0.9"
        }}>
        <nav className="nav-menu">
          <Link>마이</Link>
          <Link to="https://www.shinhancard.com/pconts/html/benefit/main/main.html">혜택</Link>
          <Link to="https://www.shinhancard.com/pconts/html/finance/main/main.html">금융</Link>
          <Link to="https://www.shinhancard.com/pconts/html/card/main/main.html">카드</Link>
          <Link to="https://www.shinhancard.com/pconts/html/life/main/main.html">서비스</Link>
          <Link to="https://www.shinhancard.com/pconts/html/topsClub/main/main.html?vname=MOBFM005R0191">Tops Club</Link>
          <Link to="/dashboard" className="solo-subscribe">
            솔로구독
          </Link>
          <Link to="https://www.shinhancard.com/mob/MOBFM12101N/MOBFM12101R01.shc">고객센터</Link>
        </nav>
      </div>
    );
  };

export default FirstPage;