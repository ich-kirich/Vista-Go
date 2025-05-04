import { Box, TextField, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import PopupComponent from "../../../../components/PopupComponent/PopupComponent";
import VerificationPassword from "../../../../components/VerificationPassword/VerificationPassword";
import styles from "./ChangePassword.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { AppError } from "../../../../libs/enums";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";

interface IChangePasswordProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  email: string | undefined;
}

function ChangePassword({ visible, setVisible, email }: IChangePasswordProps) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [visibleFieldCode, setVisibleFieldCode] = useState(false);
  const [errorRepeat, setErrorRepeat] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();

  const { fetchCodePassword } = useActions();
  const { res, error, loading } = useTypedSelector((state) => state.codepass);

  const closeNameField = () => {
    setVisible(false);
  };

  const sendCode = () => {
    setShowError(true);
    if (newPassword === repeatPassword && email) {
      fetchCodePassword(email, newPassword);
      setVisibleFieldCode(true);
    } else {
      setErrorRepeat(AppError.REENTERED_PASSWORD);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error || errorRepeat) {
      timer = setTimeout(() => {
        setErrorRepeat("");
        setShowError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, errorRepeat]);

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FetchWrapper
      loading={loading}
      error={showError ? error || errorRepeat : null}
    >
      {visible && email && (
        <Box>
          {res && (
            <PopupComponent
              visible={visibleFieldCode}
              setVisible={setVisibleFieldCode}
            >
              <VerificationPassword
                email={email}
                setVisible={setVisibleFieldCode}
              />
            </PopupComponent>
          )}
          <Box className={styles.inputs__wrapper}>
            <TextField
              label={t("change_password.enter_new_password")}
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label={t("change_password.repeat_password")}
              type={showRepeatPassword ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={sendCode}>
              {t("change_password.send_verification_code")}
            </Button>
            <Button variant="contained" fullWidth onClick={closeNameField}>
              {t("change_password.cancel")}
            </Button>
          </Box>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default ChangePassword;
