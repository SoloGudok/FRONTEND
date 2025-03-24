import MenuFooter from "../components/MenuFooter";
import React, { useEffect, useState } from "react";
import "./styles-dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ad1 from "./ad1.png";
import ad2 from "./ad2.png";
const categories = [
  { id: 0, name: "전체", emoji: "🔍" },
  { id: 1, name: "헬스케어", emoji: "🏃‍♂️‍➡️" },
  { id: 2, name: "홈/라이프", emoji: "🏠" },
  { id: 3, name: "게임", emoji: "🎮" },
  { id: 4, name: "IT", emoji: "💻" },
  { id: 5, name: "식품", emoji: "🍽️" },
  { id: 6, name: "자기개발", emoji: "🛠️" },
  { id: 7, name: "뷰티", emoji: "💄" },
  { id: 8, name: "영상", emoji: "🎥" },
  { id: 9, name: "음악", emoji: "🎵" },
  { id: 10, name: "도서", emoji: "📚" },
];

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [chart1Labels, setChart1Labels] = useState([]);
  const [chart1Datas, setChart1Datas] = useState([]);
  const [chart2Labels, setChart2Labels] = useState([]);
  const [chart2Datas, setChart2Datas] = useState([]);
  const [subscribingImg, setSubScribingImg] = useState([]);
  const [recommendSubscribingImg, setRecommendSubscribingImg] = useState([]);
  const [cards, setCards] = useState([]);
  const [advertisement_images, setadvertisement_images] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSubscriptionExpense, setTotalSubscriptionExpense] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // 상태 선언 부분에 추가
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const swiperRef = React.useRef(null);

  // 컴포넌트에 다음 함수 추가
  const handleStopAutoplay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
      setAutoplayEnabled(false);
    }
  };

  const handleStartAutoplay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
      setAutoplayEnabled(true);
    }
  };

  // 화면 크기 변경 감지 효과
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 화면 크기에 따른 슬라이더 설정
  const getSlidesPerView = () => {
    if (windowWidth < 576) {
      // 모바일
      return 4;
    } else if (windowWidth < 992) {
      // 태블릿
      return 3;
    } else {
      // 데스크탑
      return 3;
    }
  };

  const getRecommendSlidesPerView = () => {
    if (windowWidth < 576) {
      // 모바일
      return 2;
    } else if (windowWidth < 992) {
      // 태블릿
      return 2;
    } else {
      // 데스크탑
      return 2;
    }
  };

  useEffect(() => {
    fetchData();
    axios
      .get("http://192.168.0.169:8090/api/v1/dashboard/sendDashboardData")
      .then((response) =>
        setadvertisement_images(response.data.advertisementimages)
      )
      .catch((error) =>
        console.error("데이터를 가져오는 중 오류 발생:", error)
      );
  }, []);

  async function fetchData() {
    try {
      const responses = await axios.all([
        axios.get("http://192.168.0.169:8090/dashboard/subscribing"),
        axios.get("http://192.168.0.169:8090/dashboard/chart1"),
        axios.get("http://192.168.0.169:8090/dashboard/chart2"),
        axios.get("http://192.168.0.169:8090/recommend/subscription"),
        axios.get("http://192.168.0.169:8090/recommend/card"),
      ]);

      setCards(responses[4].data);
      setChart1Labels(responses[1].data.map((item) => item.expenditureName));

      const datas = responses[1].data.map((item) => item.expenditureAmount);
      setChart1Datas(datas);

      // 총 소비액 계산
      const total = datas.reduce((sum, current) => sum + current, 0);
      setTotalExpense(total);

      const subDatas = responses[2].data.map((item) => item.subAmount);
      setChart2Labels(responses[2].data.map((item) => item.subName));
      setChart2Datas(subDatas);

      // 구독 총 소비액 계산
      const totalSub = subDatas.reduce((sum, current) => sum + current, 0);
      setTotalSubscriptionExpense(totalSub);

      setSubScribingImg(responses[0].data);
      setRecommendSubscribingImg(responses[3].data);
      setLoading(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const BarChart = () => {
    // 구독 지출 상위 3개 데이터 추출
    const top3Data = chart2Datas.slice(0, 3);
    const top3Labels = chart2Labels.slice(0, 3);

    // 모바일 화면에서 바 두께 조정
    const getBarThickness = () => {
      if (windowWidth < 576) {
        return 30; // 모바일에서 더 얇게
      } else {
        return 60; // 데스크탑
      }
    };

    return (
      <div className="bar-chart-container">
        <div className="chart-wrapper">
          <div className="chart-rank-icons">
            {top3Labels.map((label, index) => (
              <div key={index} className="rank-icon">
                {index === 0 && <LooksOneIcon style={{ color: "#327BF0" }} />}
                {index === 1 && <LooksTwoIcon style={{ color: "#7AABFB" }} />}
                {index === 2 && <Looks3Icon style={{ color: "#ABC6FE" }} />}
              </div>
            ))}
          </div>

          <div className="chart-container-fixed">
            <Bar
              data={{
                labels: top3Labels,
                datasets: [
                  {
                    data: top3Data,
                    backgroundColor: ["#327BF0", "#7AABFB", "#ABC6FE"],
                    barThickness: getBarThickness(),
                    borderRadius: 10,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  // 데이터 라벨을 비활성화
                  datalabels: {
                    display: false, // 이 부분이 중요합니다!
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    border: { display: false },
                  },
                  y: {
                    beginAtZero: true,
                    grid: { display: false },
                    ticks: { display: false },
                    border: { display: false },
                  },
                },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const ExpenseBarChart = () => {
    // 누적 가로 바 차트를 위한 데이터 준비
    const dataColors = [
      "#327BF0",
      "#7AABFB",
      "#ABC6FE",
      "#CCD7EA",
      "#6495ED",
      "#4169E1",
      "#1E90FF",
      "#ADD8E6",
    ];

    // 화면 크기에 따라 차트와 레전드 레이아웃 조정
    const getChartWidth = () => {
      if (windowWidth < 576) {
        return "100%"; // 모바일에서는 화면 너비에 맞춤
      } else {
        return "450px"; // 데스크탑
      }
    };

    return (
      <div className="expense-chart-container">
        <div
          style={{ width: getChartWidth(), height: "100px" }}
          className="expense-chart"
        >
          <Bar
            data={{
              labels: ["지출"],
              datasets: chart1Labels.map((label, index) => ({
                label: label,
                data: [chart1Datas[index]],
                backgroundColor: dataColors[index % dataColors.length],
                barPercentage: 1,
                categoryPercentage: 0.8,
                borderRadius: 10,
              })),
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: "y",
              plugins: {
                legend: { display: false },
                datalabels: {
                  display: false,
                }, // 이 부분이 중요합니다!
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `${context.dataset.label}: ${context.raw.toLocaleString()}원`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  stacked: true,
                  grid: { display: false },
                  border: { display: false },
                  ticks: { display: false },
                },
                y: {
                  stacked: true,
                  grid: { display: false },
                  border: { display: false },
                  ticks: { display: false },
                },
              },
              elements: {
                bar: {
                  borderRadius: 10,
                },
              },
              layout: {
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            }}
          />
        </div>

        <div className="custom-legend">
          {chart1Labels.map((label, i) => {
            const category = categories.find((cat) => cat.name === label);
            return (
              <div key={i} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    backgroundColor: dataColors[i % dataColors.length],
                  }}
                >
                  {category ? category.emoji : "❓"}
                </span>
                <div className="legend-text-container">
                  <span className="legend-text">{label}</span>
                  <span className="legend-value">
                    {chart1Datas[i].toLocaleString()}원
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleCardImageClick = (cardIndex) => {
    const selectedCard = {
      name: cards[cardIndex].card_name,
      shortDescription: cards[cardIndex].short_description,
      description: cards[cardIndex].description,
      imageUrl: cards[cardIndex].card_img_url,
      createdAt: cards[cardIndex].created_at,
    };

    navigate("/detail", { state: selectedCard });
    window.location.reload();
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="advertisement-banner-section">
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="new-card-banner"
          >
            <SwiperSlide>
              <a href="#" alt="상세페이지로 이동">
                <img
                  src={ad1}
                  alt="advertisement-1"
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #e0e0e0",
                  }}
                />
              </a>
            </SwiperSlide>
            <SwiperSlide>
              <a href="#" alt="상세페이지로 이동">
                <img
                  src={ad2}
                  alt="advertisement-2"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                  }}
                />
              </a>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-controls">
            <div className="swiper-pagination"></div>
            <button
              type="button"
              className="swiper-button-stop"
              onClick={handleStopAutoplay}
            >
              <span className="blind">stop</span>
            </button>
            <button
              type="button"
              className="swiper-button-play"
              id="homeCardBannerPlay"
              onClick={handleStartAutoplay}
            >
              <span className="blind">play</span>
            </button>
          </div>
        </div>

        <div className="section-header">
          <span className="section-title">고객님의 현재 구독중인 서비스</span>
          <div
            className="section-link"
            onClick={() => (window.location.href = "/my-subscriptions/1")}
          >
            <h4>나의 구독 관리 하러 가기</h4>
            <ArrowCircleRightOutlinedIcon />
          </div>
        </div>

        <div className="card-container">
          <Swiper
            id="swiper-susbscription"
            slidesPerView={getSlidesPerView()}
            spaceBetween={6}
            centerInsufficientSlides={true}
            freeMode={true}
            modules={[FreeMode]}
            className="subscription-swiper"
          >
            {subscribingImg?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="sub-slider-item-container">
                  <img
                    src={item.subImgUrl}
                    className="subscription-slider-icon"
                    alt={`subscription-icon-${index}`}
                  />
                </div>
              </SwiperSlide>
            )) || <p>Loading...</p>}
          </Swiper>
        </div>

        <div className="section-header">
          <span className="section-title">
            구독 관련 소비 패턴을 분석해 봤어요!
          </span>
          <div
            className="section-link"
            onClick={() => (window.location.href = "/expenditure")}
          >
            <h4>소비내역 보러가기</h4>
            <ArrowCircleRightOutlinedIcon />
          </div>
        </div>

        <div className="expenditure-container">
          <Swiper
            spaceBetween={30}
            centeredSlides
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
              type: "bullets",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            modules={[Pagination]}
            autoHeight={true}
            className="analysis-swiper"
          >
            <div className="swiper-pagination"></div>
            <SwiperSlide>
              <div className="analysis-slide">
                <span className="analysis-title">
                  고객님의 구독 소비액은
                  <br />
                  <span className="highlight">
                    {totalSubscriptionExpense.toLocaleString()}원
                  </span>{" "}
                  입니다!
                </span>
                <span className="chart-title" style={{ marginBottom: 50 }}>
                  이달의 구독 지출내역 Top3
                </span>
                <BarChart />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="analysis-slide">
                <span className="analysis-title">
                  이번달
                  <br />
                  <span className="highlight">
                    {totalExpense.toLocaleString()}원을
                  </span>{" "}
                  지출하셨네요!
                </span>
                <ExpenseBarChart />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="recommendation-section">
          <div className="section-header">
            <span className="section-title">취향대로 즐기는 구독</span>
            <span className="section-subtitle">
              고객님의 소비 패턴을 분석해서 추천 리스트를 만들어 봤어요!
            </span>
            <div
              className="section-link"
              onClick={() => (window.location.href = "/subscriptions")}
            >
              <h4>구경하러 가기</h4>
              <ArrowCircleRightOutlinedIcon />
            </div>
          </div>

          <Swiper
            slidesPerView={getRecommendSlidesPerView()}
            spaceBetween={20}
            freeMode
            modules={[FreeMode]}
            className="recommendation-swiper"
          >
            {recommendSubscribingImg.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="recommendation-card">
                  <img
                    src={item.subscription_img_url}
                    className="sub-icon"
                    alt={`recommend-${index}`}
                  />
                  <p className="recommendation-name">{item.name}</p>
                  <p className="recommendation-price">
                    월 구독료{" "}
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="card-recommendation-section">
          <div className="section-header">
            <h2 className="section-title">고객님에게 딱 맞는 카드!</h2>
            <span className="section-subtitle">
              고객님이 현재 구독중이신 서비스를
              <br />
              신한카드 혜택과 함께 즐겨보세요!
            </span>
            <div
              className="section-link"
              onClick={() => (window.location.href = "/cards")}
            >
              <h4>구경하러 가기</h4>
              <ArrowCircleRightOutlinedIcon />
            </div>
          </div>
          {loading ? (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 내부 요소(카드) 가운데 정렬
                justifyContent: "center", // 부모 컨테이너 자체를 중앙 정렬
                gap: "15px",
                width: "100%", // 전체 화면 기준으로 정렬
                marginBottom: "30px",
              }}
            >
              {cards.map((card, index) => (
                <article
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: "10px",
                    padding: "15px",
                    border: "1px solid #e0e0e0",
                    cursor: "pointer",
                    width: "80%", // 컨테이너의 80% 너비 사용
                  }}
                  onClick={() => handleCardImageClick(index)}
                >
                  <img
                    src={card.card_img_url}
                    alt="Card"
                    style={{
                      width: "60px",
                      height: "80px",
                      borderRadius: "10px",
                      marginRight: "15px",
                    }}
                  />
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {card.card_name}
                  </h4>
                </article>
              ))}
            </section>
          ) : (
            <p style={{ textAlign: "center" }}>Loading...</p>
          )}
        </div>
      </div>
      <MenuFooter />
    </>
  );
}

export default Dashboard;
