import MenuFooter from "../components/MenuFooter";

import React, { useEffect, useRef, useState } from 'react';
import './styles-dashboard.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {

  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [chart1Labels, setChart1Labels] = useState([]); // 소비 항목 레이블 변환
  const [chart1Datas, setChart1Datas] = useState([]); // 소비 항목 데이터 변환
  const [chart2Labels, setChart2Labels] = useState([]); // 구독 항목 레이블 변환
  const [chart2Datas, setChart2Datas] = useState([]); // 구독 항목 데이터터 저장
  const [subscribingImg, setSubScribingImg] = useState([]);
  const [recommendSubscribingImg, setRecommendSubscribingImg] = useState([]);
  const [cards, setCards] = useState([]);

  const [advertisement_images, setadvertisement_images] = useState([]);

  useEffect(() => {
    fetchData();

    axios.get('http://localhost:8090/api/v1/dashboard/sendDashboardData')
      .then(response => {
        setadvertisement_images(response.data.advertisementimages);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      });
  }, []);

  async function fetchData() {
    try {
      const responses = await axios.all([
        axios.get("http://localhost:8090/dashboard/subscribing"),
        axios.get("http://localhost:8090/dashboard/chart1"),
        axios.get("http://localhost:8090/dashboard/chart2"),
        axios.get("http://localhost:8090/recommend/subscription"),
        axios.get("http://localhost:8090/recommend/card")
      ]);

      const a = {
        subscribing: responses[0].data,
        chart1: responses[1].data,
        chart2: responses[2].data,
        subscription: responses[3].data,
        card: responses[4].data
      };

      console.log(a); // 데이터 확인
      function extractChartData(chartName, key) {
        if (a[chartName] && Array.isArray(a[chartName])) {
          return a[chartName].map(item => item[key]); // 동적으로 객체 접근
        } else {
          console.error(`${chartName}이 존재하지 않거나 배열이 아닙니다.`);
          return [];
        }
      }

      // 🔥 상태 업데이트, 순서대로 해당 내용을 실행시키기 위해 useEffect이용
      setCards(a.card);
      setChart1Labels(extractChartData("chart1", "expenditureName"));
      setChart1Datas(extractChartData("chart1", "expenditureAmount"));
      setChart2Labels(extractChartData("chart2", "subName"));
      setChart2Datas(extractChartData("chart2", "subAmount"));
      setSubScribingImg(a.subscribing);
      setRecommendSubscribingImg(a.subscription);
      setLoading(true); // 로딩 완료

    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const BarChart = () => {

    const data = {
      // labels: subScription_Labels,
      labels: chart2Labels,
      datasets: [
        {
          label: '# of Votes',
          data: chart2Datas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: false,
      borderRadius: 10,   //막대 그래프 둥글게
      plugins: {
        legend: {
          display: false // 레이블 숨기기
        }
      },
      scales: {
        x: {
          grid: {
            display: false // X축 그리드 숨기기
          },
          border: {
            display: false // X축 경계선 숨기기
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false // Y축 그리드 숨기기
          },
          ticks: {
            display: false // Y축 수치 숨기기
          },
          border: {
            display: false // Y축 경계선 숨기기
          }
        }
      }
    };

    const style = {
      position: "relative",
      // height: "100%",
      // width: "70%",
    }


    return <Bar data={data} options={options} style={style} />;
  };

  const DoughnutChart = () => {
    const data = {
      labels: chart1Labels,
      datasets: [
        {
          label: '# of Votes',
          data: chart1Datas,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: false,
      
      plugins: {
        legend: {
          display: true,
          position: 'right',

          labels:{
            usePointStyle: true,
            maxWidth: 100,
            padding: 20,
            generateLabels: (chart) =>{
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, i) => ({
              text: `${label} : ${dataset.data[i].toLocaleString()}`, // Label 옆에 data값 추가
              fillStyle: dataset.backgroundColor[i],
              hidden: isNaN(dataset.data[i]),
            }));
            }
          }
        }
      }
    };
    const style = {
      position: "relative",
      // height: "100%",
      // width: "60%",
    }


    return <Doughnut data={data} options={options} style={style} />;
  };

  const navigate = useNavigate();
  // 이미지 클릭 시 서버로 카드 이름을 전송하고, Detail 페이지로 이동
  const handleCardImageClick = (cardIndex) => {
    try {
      const selectedCard = {
        name: cards[cardIndex].card_name, // 카드 이름
        shortDescription: cards[cardIndex].short_description, // 쇼츠 내용
        description: cards[cardIndex].description, // 상세 내용
        imageUrl: cards[cardIndex].card_img_url, // 이미지 URL
        createdAt : cards[cardIndex].created_at
      };

      navigate('/detail', { state: selectedCard });
      
    } catch (error) {
      console.error('Error fetching image details:', error);
    }
  };

  return (
    <>
      <Swiper id="swiper-advertisement"
        // spaceBetween={30} // 사진간 간격
        centeredSlides={true} // 정중앙 배치
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {advertisement_images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} className="adv-icon" alt={`advertisement-icon-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <h3> 고객님의 현재 구독중인 서비스 </h3>

      <Swiper id="swiper-susbscription"
        slidesPerView={8} // 보여주는 슬라이스 수
        spaceBetween={5} // 사진간 간격
        centerInsufficientSlides={true} // 슬라이드 갯수의 중간 값을 중앙으로 보이게 함.
        freeMode={true} // 부드럽게 넘기기
        modules={[FreeMode]}
      >
        {subscribingImg?.map((item, index) => (
          <SwiperSlide key={index}>
            <div><img src={item.subImgUrl} className="sub-icon" alt={`subscription-icon-${index}`} /></div>
          </SwiperSlide>
        )) || <p>Loading...</p>}
      </Swiper>
      <h1></h1>
      <div>
      <Swiper id="swiper-charts"
        spaceBetween={30}
        centeredSlides={true}
      >
        <SwiperSlide>
          <div class="charts">
          <DoughnutChart />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="charts">
          <BarChart />
          </div>
        </SwiperSlide>
      </Swiper>
      </div>
      <h3> 고객님께 추천하는 구독서비스에요! </h3>
      <div id="rcss-container">
          <>
            <Swiper id="swiper-recommendationSubscription"
              slidesPerView={4} // 보여주는 슬라이스 수
              spaceBetween={20} // 사진간 간격
              centerInsufficientSlides={true} // 슬라이드 갯수의 중간 값을 중앙으로 보이게 함.
              freeMode={true} // 부드럽게 넘기기
              modules={[FreeMode]}
            >
              {recommendSubscribingImg?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div><img src={item.subscription_img_url} className="sub-icon" alt={`subscription-icon-${index}`} /></div>
                  <div className="rcss-name"><h5 >{item.name}</h5></div>
                </SwiperSlide>
              )) || <p>Loading...</p>}
            </Swiper>
          </>
        
        <div id="rcss-container_bottom" onClick={() => window.location.href = "/cards"}><h4>더보기 &gt; </h4></div>
      </div>

      <h3> 고객님을 위한 카드추천! </h3>
      {loading ? (
        <>
          <div id="rccd-container">
            {
              cards.map((card, index) => (
                <div key={index} id={`rccd${index + 1}`}>
                  <img
                    src={card.card_img_url}
                    className="cardImg"
                    alt="SinhanCard Image"
                    onClick={() => handleCardImageClick(index)}
                  />
                  <div className="rccd-cell" onClick={() => handleCardImageClick(index)}> <h4>{card.card_name}</h4> </div>
                </div>
              ))
            }
          </div>
            <div id="rcss-bottom"></div>
          <MenuFooter />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Dashboard;
