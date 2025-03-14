import "./Event.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import MenuFooter from "../components/MenuFooter";
import event1 from "../components/img/event1.png";
import event2 from "../components/img/event2.png";
import event3 from "../components/img/event3.png";
import event4 from "../components/img/event4.png";
import event5 from "../components/img/event5.png";
import event6 from "../components/img/event6.png";
import event7 from "../components/img/event7.png";
import event8 from "../components/img/event8.png";
import character from "../components/img/character.png";
import back_icon from "../components/img/back_icon.png";

const eventList = [
  {
    id: 1,
    title: "25.02 Tops 제주 신화월드 호텔 & 리조트 이벤트",
    date: "2025-03-31",
    image: event1,
  },
  {
    id: 2,
    title: "최대 4천 포인트 받아가는 자산 곡 이벤트!",
    date: "2025-03-31",
    image: event2,
  },
  {
    id: 3,
    title: "올댓골프프 x 골프존 티스캐너 모바일 예약 이벤트",
    date: "2025-07-29",
    image: event3,
  },
  {
    id: 4,
    title: "에이스침대 x 신한카드 포인트 24만원 이벤트",
    date: "2025-03-31",
    image: event4,
  },
  {
    id: 5,
    title: "25.02 Tops 제주 카세로지호텔 이벤트트",
    date: "2025-03-31",
    image: event5,
  },
  {
    id: 6,
    title: "2025 일본 F1 그랑프리 직관 이벤트",
    date: "2025-03-16",
    image: event6,
  },
  {
    id: 7,
    title: "The ACE BLUE LABEL 샤롯데 영화관 1 + 1 이벤트",
    date: "2025-12-31",
    image: event7,
  },
  {
    id: 8,
    title: "통인익스프레스로 이사하고 5만P 받자!",
    date: "2025-06-30",
    image: event8,
  },
];

const Event = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="event-header">
        <div className="event-header-leftside" onClick={() => navigate(-1)}>
          <img src={back_icon} alt="뒤로가기" />
        </div>

        <div className="event-header-center">
          <img
            src={character}
            alt="이벤트 캐릭터"
            className="event-header-character"
          />
          <span className="event-header-title">이벤트</span>
        </div>
      </div>
      <div className="event-container">
        <ul className="event-list">
          {eventList.map((event) => (
            <li key={event.id} className="event-item">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <MenuFooter />
    </>
  );
};
export default Event;
