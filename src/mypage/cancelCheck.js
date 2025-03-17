import "./cancelCheck.css";
import MenuFooter from "../components/MenuFooter";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "../main/styles-dashboard.css";

export default function CancelCheck() {
  const [recommendSubscribingImg, setRecommendSubscribingImg] = useState([]);
  const [loading, setLoading] = useState(false); // 데이터 로딩 상태
  const [advertisement_images, setadvertisement_images] = useState([]);

  useEffect(() => {
    fetchSubscriptionData();

    axios
      .get("http://localhost:8090/api/v1/dashboard/sendDashboardData")
      .then((response) => {
        setadvertisement_images(response.data.advertisementimages);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  async function fetchSubscriptionData() {
    try {
      const response = await axios.get(
        "http://localhost:8090/recommend/subscription"
      );

      setRecommendSubscribingImg(response.data); // 추천 구독 데이터 업데이트
      setLoading(true); // 로딩 완료
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  }

  return (
    <>
      <div className="cancel-checkBox">
        <div className="cancel-checkBox-title">
          <p>해지신청을 완료했어요.</p>
        </div>
        <div className="cancel-checkBox-img">
          <img
            src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
            alt="Logo"
          />
          <img
            src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
            alt="Logo"
          />
          <img
            src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
            alt="Logo"
          />
          {/* {images.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt="Logo" />
          ))} */}
        </div>
        <div className="cancel-checkBox-content">
          해지가 완료되면 <br /> 알림을 보내드리겠습니다.
        </div>
      </div>
      <div className="recommend-service">
        <p>고객님만을 위한 구독 꿀조합이 준비되어 있어요!</p>
        {/* 대시보드에 구독 추천 그래도 가져올 예정 */}
        <div>
          <div id="rcss-container">
            <Swiper
              id="swiper-recommendationSubscription"
              slidesPerView={4}
              spaceBetween={20}
              centerInsufficientSlides={true}
              freeMode={true}
              modules={[FreeMode]}
            >
              {recommendSubscribingImg.map((item, index) => (
                <SwiperSlide key={index}>
                  <div>
                    <img
                      src={item.subscription_img_url}
                      className="sub-icon"
                      alt={`subscription-icon-${index}`}
                    />
                  </div>
                  <div className="rcss-name">
                    <h5>{item.name}</h5>
                  </div>
                </SwiperSlide>
              )) || <p>Loading...</p>}
            </Swiper>

            <div
              id="rcss-container_bottom"
              onClick={() => (window.location.href = "/cards")}
            >
              <h4>더보기 &gt; </h4>
            </div>
          </div>
        </div>
      </div>
      <MenuFooter />
    </>
  );
}
