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
            style={{ width: 200, height: 200, paddingBottom: 10 }}
          />
          <img
            src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
            alt="Logo"
            style={{ width: 200, height: 200, paddingBottom: 10 }}
          />
          <img
            src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
            alt="Logo"
            style={{ width: 200, height: 200, paddingBottom: 10 }}
          />
        </div>
      </div>
      <div className="recommend-service">
        <p>고객님만을 위한 구독 꿀조합이 준비되어 있어요!</p>
      </div>
    </>
  );
}
