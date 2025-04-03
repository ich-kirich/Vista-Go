import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import VerificationPassword from "../../../../components/VerificationPassword/VerificationPassword";
import { useTranslation } from "react-i18next";
import styles from "./RecoveryPassword.module.scss";

interface IRecoveryPasswordProps {
  setVisible: (visible: boolean) => void;
}

function RecoveryPassword({ setVisible }: IRecoveryPasswordProps) {
  const [emailUser, setEmailUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sentMail, setSentMail] = useState(false);

  const { fetchCodePassword } = useActions();
  const { error, loading } = useTypedSelector((state) => state.codepass);
  const { t } = useTranslation();

  const sendCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchCodePassword(emailUser, newPassword);
    setSentMail(true);
  };

  return (
    <Box className={styles.recovery__wrapper}>
      <Box className={styles.inputs__wrapper}>
        <TextField
          label={t("recovery_password.enter_email")}
          type="email"
          value={emailUser}
          onChange={(e) => setEmailUser(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label={t("recovery_password.enter_new_password")}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          fullWidth
        />
      </Box>
      <Box className={styles.btns__wrapper}>
        <Button variant="contained" fullWidth onClick={sendCode}>
          {t("recovery_password.send_verification_code")}
        </Button>
      </Box>
      <Box>
        {sentMail && (
          <FetchWrapper loading={loading} error={error}>
            <VerificationPassword email={emailUser} setVisible={setVisible} />
          </FetchWrapper>
        )}
      </Box>
    </Box>
  );
}

export default RecoveryPassword;
