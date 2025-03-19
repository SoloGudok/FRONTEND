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

// 기존 코드에 categories를 사용하면 정상 작동할 거야!

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
      setChart1Datas(responses[1].data.map((item) => item.expenditureAmount));
      setChart2Labels(responses[2].data.map((item) => item.subName));
      setChart2Datas(responses[2].data.map((item) => item.subAmount));
      setSubScribingImg(responses[0].data);
      setRecommendSubscribingImg(responses[3].data);
      setLoading(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const BarChart = () => (
    <Bar
      data={{
        labels: chart2Labels,
        datasets: [
          {
            data: chart2Datas,
            backgroundColor: ["#327BF0", "#7AABFB", "#ABC6FE", "#CCD7EA"],
          },
        ],
      }}
      options={{
        responsive: false,
        borderRadius: 10,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: {
            beginAtZero: true,
            grid: { display: false },
            ticks: { display: false },
            border: { display: false },
          },
        },
      }}
    />
  );

  const DoughnutChart = () => (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Doughnut
        data={{
          labels: chart1Labels,
          datasets: [
            {
              data: chart1Datas,
              backgroundColor: ["#327BF0", "#7AABFB", "#ABC6FE", "#CCD7EA"],
            },
          ],
        }}
        options={{
          responsive: false,
          plugins: {
            legend: { display: false }, // 기본 범례 숨기기
          },
        }}
      />

      {/* 커스텀 범례 추가 */}
      <div className="custom-legend">
        {chart1Labels.map((label, i) => {
          // 해당하는 카테고리 찾기
          const category = categories.find((cat) => cat.name === label);
          return (
            <div key={i} className="legend-item">
              {/* 원 안에 이모지 표시 */}
              <span className="legend-color">
                {category ? category.emoji : "❓"}
              </span>
              {/* 카테고리명 & 가격 */}
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

  const handleCardImageClick = (cardIndex) => {
    const selectedCard = cards[cardIndex];
    navigate("/detail", { state: selectedCard });
    window.location.reload();
  };

  return (
    <>
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

      <h3>고객님! 이번달 고객님의 소비를 분석해 봤어요 </h3>
      <Swiper slidesPerView={8} spaceBetween={5} freeMode modules={[FreeMode]}>
        {subscribingImg.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.subImgUrl}
              className="sub-icon"
              alt={`subscription-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        spaceBetween={30}
        centeredSlides
        pagination
        modules={[Pagination]}
      >
        <SwiperSlide>
          <h4>이달의 소비 지출내역</h4>
          <div className="chart-container">
            <DoughnutChart />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <h4>이달의 구독 지출내역 Top3</h4>
          <div className="chart-container">
            <BarChart />
          </div>
        </SwiperSlide>
      </Swiper>

      <h3>고객님께 추천하는 구독서비스</h3>
      <Swiper slidesPerView={4} spaceBetween={20} freeMode modules={[FreeMode]}>
        {recommendSubscribingImg.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item.subscription_img_url}
              className="sub-icon"
              alt={`recommend-${index}`}
            />
            <p className="rcss-name">{item.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <h3>고객님을 위한 카드추천</h3>
      {loading ? (
        <section id="rccd-container">
          {cards.map((card, index) => (
            <article
              key={index}
              className="rccd-card"
              onClick={() => handleCardImageClick(index)}
            >
              <img src={card.card_img_url} className="cardImg" alt="Card" />
              <h4>{card.card_name}</h4>
            </article>
          ))}
        </section>
      ) : (
        <p>Loading...</p>
      )}

      <MenuFooter />
    </>
  );
}

export default Dashboard;
