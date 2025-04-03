import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../../components/ViewError/ViewError";
import { ADMIN_ROLE } from "../../libs/constants";
import ChangeUsername from "./components/ChangeUsername/ChangeUsername";
import useTypedSelector from "../../hooks/useTypedSelector";
import ChangeImage from "./components/ChangeImage/ChangeImage";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import {
  AppError,
  Auth,
  Locales,
  LocalStorageKeys,
  Routes,
  User,
} from "../../libs/enums";
import { getValidToken } from "../../libs/utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

function CabinetPage() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [activeField, setActiveField] = useState<
    "name" | "image" | "password" | null
  >(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(Locales.EN);
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // Используем i18n для смены языка

  useEffect(() => {
    const token = user || getValidToken();
    if (token) {
      try {
        setUserInfo(token);
      } catch {
        setError(AppError.LOADING_USER);
      }
    } else {
      setError(AppError.LOADING_USER);
    }
  }, [user]);

  const logout = () => {
    navigate(Routes.LOGIN);
    localStorage.removeItem(LocalStorageKeys.TOKEN);
    dispatch({ type: Auth.LOGOUT });
    dispatch({ type: User.FETCH_USER_LOGOUT });
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  if (error) return <ViewError>{t(`${error}`)}</ViewError>;

  return (
    <Box className={styles.user__wrapper}>
      {userInfo && (
        <Box className={styles.user__information}>
          <Box
            className={styles.user__img}
            sx={{ backgroundImage: `url(${userInfo.image})` }}
          />
          <Box>
            <Typography variant="h6">
              {t("cabinet.login")}: {userInfo.email}
            </Typography>
            <Typography variant="h6">
              {t("cabinet.name")}: {userInfo.name}
            </Typography>
            <Typography variant="h6">
              {t("cabinet.password")}: ••••••••
            </Typography>
            <Box className={styles.language__selector}>
              <FormControl fullWidth>
                <InputLabel>{t("cabinet.select_language")}</InputLabel>
                <Select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  label={t("cabinet.select_language")}
                >
                  <MenuItem value={Locales.EN}>
                    {t("cabinet.language_english")}
                  </MenuItem>
                  <MenuItem value={Locales.RU}>
                    {t("cabinet.language_russian")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}

      <Box className={styles.user__controls}>
        {["name", "image", "password"].map((field) => (
          <Button
            key={field}
            variant="contained"
            fullWidth
            onClick={() => setActiveField(field as typeof activeField)}
          >
            {t(`cabinet.change_${field}`)}
          </Button>
        ))}
        {user && user.role === ADMIN_ROLE && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(Routes.ADMIN)}
          >
            {t("cabinet.admin_panel")}
          </Button>
        )}
        <Button variant="contained" fullWidth onClick={logout}>
          {t("cabinet.logout")}
        </Button>
      </Box>

      {activeField === "name" && (
        <ChangeUsername visible setVisible={() => setActiveField(null)} />
      )}
      {activeField === "image" && (
        <ChangeImage visible setVisible={() => setActiveField(null)} />
      )}
      {activeField === "password" && (
        <ChangePassword
          visible
          setVisible={() => setActiveField(null)}
          email={userInfo?.email}
        />
      )}
    </Box>
  );
}

export default CabinetPage;
