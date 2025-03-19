import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setError("로그인이 필요합니다.");
      return;
    }

    axios.get(`http://localhost:8090/api/v1/user/profile?token=Bearer%20${token}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(err => {
        setError("프로필 정보를 불러올 수 없습니다.");
        console.error("에러 발생:", err);
      });
  }, []);

  return (
    <div>
      <h2>프로필 페이지</h2>
      {error ? <p style={{ color: "red" }}>{error}</p> : <p>{profileData}</p>}
    </div>
  );
};

export default Profile;