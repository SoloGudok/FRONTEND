import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useSearchParams, useNavigate } from "react-router-dom";
import MenuFooter from "../components/MenuFooter";

const providers = [{ id: "credentials", name: "Email and Password" }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

export default function SlotsSignIn() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [dtoList, setDtoList] = useState([]);
  const [searchParams] = useSearchParams();
  const ids = searchParams.getAll("id");

  useEffect(() => {
    if (ids.length > 0) {
      axios
        .get(
          `http://localhost:8090/api/v1/unsubscription?id=${ids.join("&id=")}`
        )
        .then((response) => {
          setDtoList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [ids]);

  const handleAgreementChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreed) {
      alert("해지 신청을 위해 동의 체크박스를 선택하세요.");
      return;
    }
    try {
      await Promise.all(
        dtoList.map((dto) =>
          axios.post(`http://localhost:8090/api/v1/unsubscription/uni_cancel`, {
            email: "user@example.com",
            password: "userpassword",
            serviceId: dto.id,
          })
        )
      );
      navigate(`/mypage/cancelCheck?id=${ids.join("&id=")}`);
    } catch (error) {
      console.error("Error processing unsubscription:", error);
      alert("해지 요청 중 오류가 발생했습니다.");
    }
  };

  function Title() {
    return (
      <>
        <h2 style={{ marginBottom: 8 }}>해지 신청</h2>
        {dtoList.length > 0 && (
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {dtoList.map((dto, index) => (
              <img
                key={index}
                src={dto.subImgUrl}
                alt={`Service Logo ${index}`}
                style={{ width: 200, height: 200, paddingBottom: 10 }}
              />
            ))}
          </div>
        )}
      </>
    );
  }

  function Subtitle() {
    return (
      <Alert sx={{ mb: 2, px: 1, py: 0.25 }} severity="warning">
        {dtoList.map((dto) => dto.name).join(", ")} 계정 정보를 입력하세요.
      </Alert>
    );
  }

  return (
    <>
      <AppProvider theme={theme}>
        <SignInPage
          signIn={handleSubmit}
          slots={{
            title: Title,
            subtitle: Subtitle,
            emailField: CustomEmailField,
            passwordField: CustomPasswordField,
            submitButton: () => (
              <Button
                type="submit"
                variant="outlined"
                color="info"
                size="small"
                disableElevation
                fullWidth
                sx={{ my: 2 }}
                onClick={handleSubmit}
              >
                해지 신청
              </Button>
            ),
            rememberMe: () => (
              <FormControlLabel
                control={
                  <Checkbox
                    name="tandc"
                    value="true"
                    color="primary"
                    sx={{
                      padding: 0.5,
                      "& .MuiSvgIcon-root": { fontSize: 20 },
                    }}
                    checked={agreed}
                    onChange={handleAgreementChange}
                  />
                }
                slotProps={{
                  typography: {
                    fontSize: 14,
                  },
                }}
                color="textSecondary"
                label="해지 신청에 동의합니다."
              />
            ),
          }}
          providers={providers}
        />
      </AppProvider>
      <MenuFooter />
    </>
  );
}
