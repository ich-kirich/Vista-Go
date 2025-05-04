import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../../components/ViewError/ViewError";
import ChangeUsername from "./components/ChangeUsername/ChangeUsername";
import useTypedSelector from "../../hooks/useTypedSelector";
import ChangeImage from "./components/ChangeImage/ChangeImage";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import {
  AppError,
  Auth,
  Locales,
  LocalStorageKeys,
  ROLES,
  Routes,
  User,
} from "../../libs/enums";
import { getValidToken } from "../../libs/utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createSupportRequest } from "../../api/userService";
import Loader from "../../components/Loader/Loader";

function CabinetPage() {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [activeField, setActiveField] = useState<
    "name" | "image" | "password" | null
  >(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language as Locales,
  );
  const navigate = useNavigate();
  const {
    user,
    error: userError,
    loading,
  } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState("");
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState<string | null>(null);
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [displayError, setDisplayError] = useState(true);

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

  const handleSupportSubmit = async () => {
    setSupportLoading(true);
    setSupportError(null);
    try {
      await createSupportRequest(supportMessage);
      setSupportSuccess(true);
      setSupportMessage("");
    } catch (err) {
      setSupportError(
        t("cabinet.support_send_error") || t("app_error.unexpected_error"),
      );
    } finally {
      setSupportLoading(false);
    }
  };

  const handleSupportClose = () => {
    setSupportModalOpen(false);
    setSupportMessage("");
    setSupportError(null);
    setSupportSuccess(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (userError) {
      timer = setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [userError]);

  if (error) return <ViewError>{error}</ViewError>;

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
        {user && user.role === ROLES.ADMIN && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(Routes.ADMIN)}
          >
            {t("cabinet.admin_panel")}
          </Button>
        )}
        {(user?.role === ROLES.GUIDE ||
          getValidToken()?.role === ROLES.GUIDE) && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setSupportModalOpen(true)}
          >
            {t("cabinet.contact_admin")}
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

      {loading ? (
        <Loader />
      ) : (
        <Box>
          {userError && displayError && <ViewError>{userError}</ViewError>}
        </Box>
      )}

      <Dialog fullWidth open={supportModalOpen} onClose={handleSupportClose}>
        <DialogTitle>{t("cabinet.support_title_modal")}</DialogTitle>
        <DialogContent>
          {!supportLoading && !supportError && !supportSuccess && (
            <TextField
              label={t("cabinet.support_message")}
              multiline
              rows={4}
              fullWidth
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
            />
          )}
          {supportLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {supportError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {supportError}
            </Alert>
          )}
          {supportSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {t("cabinet.support_success")}
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSupportClose} disabled={supportLoading}>
            {t("cabinet.close_email_form")}
          </Button>
          <Button
            onClick={handleSupportSubmit}
            disabled={
              supportLoading || supportSuccess || !supportMessage.trim()
            }
          >
            {t("cabinet.send")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CabinetPage;
