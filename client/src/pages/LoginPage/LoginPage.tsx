import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../../components/Loader/Loader";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import RecoveryPassword from "./components/RecoveryPassword/RecoveryPassword";
import styles from "./LoginPage.module.scss";
import { Auth, Routes } from "../../libs/enums";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visibleChangePass, setVisibleChangePass] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { fetchUser } = useActions();
  const { user, error, loading } = useTypedSelector((state) => state.user);

  const changePassword = (event: React.MouseEvent) => {
    event.stopPropagation();
    setVisibleChangePass(true);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    fetchUser(username, password);
    setLoginClicked(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (loginClicked && !loading && !error) {
      dispatch({ type: Auth.LOGIN });
      navigate(Routes.HOME);
    }
    if (user) {
      navigate(Routes.HOME);
    }
  }, [loginClicked, loading, error, dispatch, navigate]);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Box className={styles.login__wrapper}>
            {error && (
              <Typography
                variant="h6"
                component="h2"
                className={styles.login__title}
              >
                {t(error)}
              </Typography>
            )}
            <Box className={styles.login__form}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.login__title}
              >
                {t("login_page.login")}
              </Typography>
              <TextField
                label={t("login_page.enter_email")}
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label={t("login_page.enter_password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {t("login_page.log_in")}
              </Button>
              <Link className={styles.login__link} to={Routes.REGISTRATION}>
                {t("login_page.no_account")}
              </Link>
              <Button onClick={changePassword} className={styles.login__forgot}>
                {t("login_page.forgot_password")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <PopupComponent
        visible={visibleChangePass}
        setVisible={setVisibleChangePass}
      >
        <RecoveryPassword setVisible={setVisibleChangePass} />
      </PopupComponent>
    </Box>
  );
}

export default LoginPage;
