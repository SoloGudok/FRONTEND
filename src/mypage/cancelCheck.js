import "./cancelCheck.css";
import MenuFooter from "../components/MenuFooter";

export default function CancelCheck() {
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
      </div>
      <MenuFooter />
    </>
  );
}
