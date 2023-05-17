import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IRecoveryPassword } from "../../types/types";
import Loader from "../Loader/Loader";
import VerificationPassword from "../VerificationPassword/VerificationPassword";
import ViewError from "../ViewError/ViewError";
import styles from "./RecoveryPassword.module.scss";

function RecoveryPassword(props: IRecoveryPassword) {
  const { setVisible } = props;
  const [emailUser, setEmailUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sentMail, setSentMail] = useState(false);

  const { fetchCodePassword } = useActions();
  const { error, loading } = useTypedSelector((state) => state.codepass);

  const sendCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchCodePassword(emailUser, newPassword);
    setSentMail(true);
  };

  return (
    <Box className={styles.recovery__wrapper}>
      <Box className={styles.inputs__wrapper}>
        <TextField
          label="Enter your email"
          type="email"
          value={emailUser}
          onChange={(e) => setEmailUser(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Enter new password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          fullWidth
        />
      </Box>
      <Box className={styles.btns__wrapper}>
        <Button variant="contained" fullWidth onClick={sendCode}>
          Send Verification code on email
        </Button>
      </Box>
      <Box>
        {sentMail && (
          <Box>
            {loading ? (
              <Loader />
            ) : (
              <Box>
                {error ? (
                  <ViewError>{error}</ViewError>
                ) : (
                  <VerificationPassword
                    email={emailUser}
                    password={newPassword}
                    setVisible={setVisible}
                  />
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RecoveryPassword;
