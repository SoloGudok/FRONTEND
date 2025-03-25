import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = ""; // ✅ API 기본 주소

// ✅ Axios 인스턴스 생성
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// ✅ 토큰 만료 여부 확인 함수 (jwtUtil과 동일한 로직)
const isTokenExpired = (token) => {
    if (!token) return true; // 토큰이 없으면 만료된 것으로 간주

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // 현재 시간(초 단위)
        // console.log(`🔍 [JWT] 토큰 만료 시간: ${decoded.exp}, 현재 시간: ${now}`);
        return decoded.exp < now; // 현재 시간이 만료 시간보다 크면 만료됨
    } catch (error) {
        console.error("[JWT] 토큰 디코딩 오류:", error);
        return true; // 오류 발생 시 만료된 것으로 처리
    }
};

// ✅ `refreshToken`을 사용하여 `accessToken` 갱신하는 함수
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            // console.log("[JWT] 리프레시 토큰 없음, 로그아웃 필요");
            // handleLogout(); // ✅ 로그아웃 처리 추가
            removeToken();
            return false;
        }

        // console.log("[JWT] 토큰 갱신 요청 실행");

        const response = await axios.post("/auth/refresh", { refreshToken });

        if (response.data.accessToken) {
            localStorage.setItem("accessToken", response.data.accessToken);
            console.log("[JWT] 새로운 액세스 토큰 발급됨!", response.data.accessToken);
            return response.data.accessToken;
        } else {
            console.log("[JWT] 리프레시 토큰 요청 실패: 응답에 accessToken 없음");
            // handleLogout(); // 로그아웃 처리 추가
            removeToken();
            return false;
        }
    } catch (error) {
        console.log("[JWT] 리프레시 토큰 요청 실패:", error);
        // handleLogout(); // 리프레시 토큰 만료 시 로그아웃 실행
        removeToken();
        return false;
    }
};

// ✅ 로그아웃 함수 추가
const handleLogout = () => {
    // console.log("[JWT] 모든 토큰이 만료됨. 로그아웃 처리.");
    removeToken();
    window.location.reload();
    window.location.href = "/subscriptions"; // 로그인 페이지로 강제 이동
};

const removeToken = () =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export { api, handleLogout, isTokenExpired, refreshAccessToken };