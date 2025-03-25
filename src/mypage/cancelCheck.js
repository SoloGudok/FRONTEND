import "./cancelCheck.css";
import MenuFooter from "../components/MenuFooter";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "../main/styles-dashboard.css";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
export default function CancelCheck() {
  const [recommendSubscribingImg, setRecommendSubscribingImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advertisement_images, setAdvertisementImages] = useState([]);
  const [cancelledServices, setCancelledServices] = useState([]);
  const [searchParams] = useSearchParams();
  const ids = searchParams.getAll("id");

  useEffect(() => {
    fetchSubscriptionData();
    fetchCancelledServices();

    axios
      .get(process.env.REACT_APP_API_URL+"/api/v1/dashboard/sendDashboardData")
      .then((response) => {
        setAdvertisementImages(response.data.advertisementimages);
      })
      .catch((error) => {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      });
  }, []);

  async function fetchSubscriptionData() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+"/recommend/subscription"
      );
      setRecommendSubscribingImg(response.data);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  }

  async function fetchCancelledServices() {
    if (!ids || ids.length === 0) {
      console.warn("No IDs provided");
      return;
    }
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL+"/api/v1/unsubscription",
        {
          params: { id: ids },
          paramsSerializer: {
            indexes: null, // 이 옵션이 중요합니다.
          },
        }
      );
      setCancelledServices(response.data);
    } catch (error) {
      console.error("Error fetching cancelled services:", error);
    }
  }

  const displayedImages =
    cancelledServices.length <= 1
      ? cancelledServices
      : cancelledServices.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <>
      <h3
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginLeft: "20px",
        }}
      >
        해지 완료
      </h3>
      <div className="cancel-checkBox">
        <div className="cancel-checkBox-title">
          <p>해지신청을 완료했어요.</p>
        </div>
        <div className="cancel-checkBox-img">
          {displayedImages.map((service, index) => (
            <img key={index} src={service.subImgUrl} alt={service.name} />
          ))}
        </div>
        <div className="cancel-checkBox-content">
          해지가 완료되면 <br /> 알림을 보내드리겠습니다.
        </div>
      </div>

      <div className="recommend-service">
        <h4
          style={{
            fontWeight: "bold",
            textAlign: "left",
            marginLeft: "20px",
          }}
        >
          고객님을 위한 구독
        </h4>
        <div
          className="section-link"
          onClick={() => (window.location.href = "/subscriptions")}
        >
          <h4>구경하러 가기</h4>
          <ArrowCircleRightOutlinedIcon />
        </div>
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
          </div>
        </div>
      </div>

      <MenuFooter />
    </>
  );
}
