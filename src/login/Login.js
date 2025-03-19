import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8090/auth/login", { email, password });

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            console.log("✅ 로그인 성공!");

            onLogin();
            navigate("/"); // ✅ 로그인 후 대시보드로 이동
        } catch (error) {
            console.error("❌ 로그인 실패:", error);
            alert("로그인 실패");
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 입력" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" />
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
};

export default Login;