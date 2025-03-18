import * as React from "react";
import { useState } from "react";
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

function Title() {
  return (
    <>
      <h2 style={{ marginBottom: 8 }}>해지 신청</h2>
      <img
        src="https://sologudok-uploaded-files.s3.ap-northeast-2.amazonaws.com/ott_netflix.png"
        alt="Logo"
        style={{ width: 200, height: 200, paddingBottom: 10 }}
      />
    </>
  );
}

function Subtitle() {
  return (
    <Alert sx={{ mb: 2, px: 1, py: 0.25 }} severity="warning">
      넷플릭스 계정 정보를 입력하세요.
    </Alert>
  );
}

export default function SlotsSignIn() {
  const theme = useTheme();
  const [agreed, setAgreed] = useState(false);

  const handleAgreementChange = (event) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreed) {
      alert("해지 신청을 위해 동의 체크박스를 선택하세요.");
      return;
    }
    alert("넷플릭스를 해지합니다.");
  };

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
    </>
  );
}
