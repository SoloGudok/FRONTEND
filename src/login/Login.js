import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import MenuFooter from "../components/MenuFooter";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("/auth/login", { email, password });

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            console.log("✅ 로그인 성공!");

            onLogin();
            navigate("/dashboard"); // ✅ 로그인 후 대시보드로 이동
            window.location.reload();
        } catch (error) {
            console.error("❌ 로그인 실패:", error);
            alert("로그인 실패");
        }
    };
    return (
        <>
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">로그인</h2>

                <div className="input-group">
                    <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디 입력" />
                    <button className="clear-btn">×</button>
                </div>

                <div className="input-group">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" />
                    <button className="clear-btn">×</button>
                </div>

                <button className="login-btn" onClick={handleLogin}>로그인 하기</button>
            </div>
        </div>
        <MenuFooter />
        </>
    );
};

export default Login;