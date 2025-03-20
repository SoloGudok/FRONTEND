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
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    axios
      .get("http://localhost:8090/api/v1/dashboard/sendDashboardData")
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
        axios.get("http://localhost:8090/dashboard/subscribing"),
        axios.get("http://localhost:8090/dashboard/chart1"),
        axios.get("http://localhost:8090/dashboard/chart2"),
        axios.get("http://localhost:8090/recommend/subscription"),
        axios.get("http://localhost:8090/recommend/card"),
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

    return (
      <div
        className="bar-chart-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            marginTop: "20px",
          }}
        >
          <div
            className="chart-rank-icons"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              paddingLeft: "8%",
              paddingRight: "8%",
            }}
          >
            {top3Labels.map((label, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "80px",
                }}
              >
                {index === 0 && <LooksOneIcon style={{ color: "#327BF0" }} />}
                {index === 1 && <LooksTwoIcon style={{ color: "#7AABFB" }} />}
                {index === 2 && <Looks3Icon style={{ color: "#ABC6FE" }} />}
              </div>
            ))}
          </div>

          {/* 차트 컨테이너에 고정 높이 지정 */}
          <div style={{ height: "200px", width: "100%" }}>
            <Bar
              data={{
                labels: top3Labels,
                datasets: [
                  {
                    data: top3Data,
                    backgroundColor: ["#327BF0", "#7AABFB", "#ABC6FE"],
                    barThickness: 60,
                    borderRadius: 10,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // 이 옵션이 중요합니다
                plugins: { legend: { display: false } },
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
                  },
                },
              }}
            />
            <span>이달의 구독 지출내역 Top3</span>
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

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "450px", height: "100px", align: "center" }}>
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

        <div className="custom-legend" style={{ marginTop: "25px" }}>
          {chart1Labels.map((label, i) => {
            const category = categories.find((cat) => cat.name === label);
            return (
              <div key={i} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    backgroundColor: dataColors[i % dataColors.length],
                    color: "white",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {category ? category.emoji : "❓"}
                </span>
                <span className="legend-text">{label}</span>
                <span className="legend-text">
                  {chart1Datas[i].toLocaleString()}원
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleCardImageClick = (cardIndex) => {
    const selectedCard = cards[cardIndex];
    navigate("/detail", { state: selectedCard });
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div>
          <Swiper
            id="swiper-advertisement"
            centeredSlides
            autoplay={{ delay: 2500 }}
            pagination
            navigation
            modules={[Autoplay, Pagination, Navigation]}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {advertisement_images.map((image, index) => (
              <SwiperSlide
                key={index}
                style={{ width: 500, height: 500, borderRadius: "10%" }}
              >
                <img
                  src={image}
                  className="adv-icon"
                  alt={`advertisement-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            textAlign: "left",
            marginTop: "50px",
            marginBottom: "30px",
            marginLeft: "50px",
          }}
        >
          고객님의 현재 구독중인 서비스
        </span>

        <div
          style={{
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "15px",
            margin: "20px auto",
          }}
        >
          <Swiper
            id="swiper-susbscription"
            slidesPerView={3} // 보여주는 슬라이스 수
            spaceBetween={6} // 사진간 간격
            centerInsufficientSlides={true} // 슬라이드 갯수의 중간 값을 중앙으로 보이게 함.
            freeMode={true} // 부드럽게 넘기기
            modules={[FreeMode]}
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
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            textAlign: "left",
            marginTop: "50px",
            marginBottom: "30px",
            marginLeft: "50px",
          }}
        >
          구독 관련 소비 패턴을 분석해 봤어요!
        </span>
        <div
          style={{
            width: "80%",
            border: "1px solid #ddd",
            borderRadius: "15px",
            padding: "15px",
            margin: "20px auto",
          }}
        >
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
            autoHeight={true} // 내용에 맞게 높이 자동 조절
            style={{ height: "auto" }} // 스와이퍼 컨테이너 높이를 자동으로 설정
          >
            {/* Swiper 아래에 페이지네이션 표시 영역 추가 */}
            <div
              className="swiper-pagination"
              style={{
                position: "relative",
                bottom: "0",
                marginTop: "20px",
              }}
            ></div>
            <SwiperSlide>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "block",
                  textAlign: "left",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
              >
                고객님의 구독 소비액은
                <br />
                <span style={{ color: "#327BF0" }}>
                  {totalSubscriptionExpense.toLocaleString()}원
                </span>{" "}
                입니다!
              </span>
              <div
                className="chart-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <BarChart />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  display: "block",
                  textAlign: "left",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
              >
                이번달
                <br />
                <span style={{ color: "#327BF0" }}>
                  {totalExpense.toLocaleString()}원을을
                </span>{" "}
                지출하셨네요!
              </span>
              <div
                className="chart-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ExpenseBarChart />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              display: "block",
              textAlign: "left",
              marginTop: "50px",
              marginBottom: "30px",
              marginLeft: "50px",
            }}
          >
            취향대로 즐기는 구독
          </span>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              display: "block",
              textAlign: "left",
              marginBottom: "30px",
              marginLeft: "50px",
              color: "gray",
            }}
          >
            고객님의 소비 패턴을 분석해서 추천 리스트를 만들어 봤어요!
          </span>
          <Swiper
            slidesPerView={2}
            spaceBetween={20}
            freeMode
            modules={[FreeMode]}
          >
            {recommendSubscribingImg.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    width: "80%",
                    border: "1px solid #ddd",
                    borderRadius: "15px",
                    padding: "15px",
                    margin: "20px auto",
                  }}
                >
                  <img
                    src={item.subscription_img_url}
                    className="sub-icon"
                    alt={`recommend-${index}`}
                  />
                  <p
                    className="rcss-name"
                    style={{
                      fontSize: 20,
                      textAlign: "left",
                      paddingLeft: "30px",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="rcss-name"
                    style={{
                      fontSize: 18,
                      textAlign: "left",
                      paddingLeft: "30px",
                    }}
                  >
                    월 구독료 {item.price}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "left",
              margin: "50px 0 30px 50px",
            }}
          >
            고객님에게 딱 맞는 카드!
          </h2>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              display: "block",
              textAlign: "left",
              marginBottom: "30px",
              marginLeft: "50px",
              color: "gray",
            }}
          >
            고객님이 현재 구독중이신 서비스를
            <br />
            신한카드 혜택과 함께 즐겨보세요!
          </span>
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
