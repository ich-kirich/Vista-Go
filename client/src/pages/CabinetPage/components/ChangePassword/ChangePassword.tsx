import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import PopupComponent from "../../../../components/PopupComponent/PopupComponent";
import VerificationPassword from "../../../../components/VerificationPassword/VerificationPassword";
import styles from "./ChangePassword.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { ERROR } from "../../../../libs/constants";

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

  const { fetchCodePassword } = useActions();
  const { error, loading } = useTypedSelector((state) => state.codepass);

  const closeNameField = () => {
    setVisible(false);
  };

  const sendCode = () => {
    if (newPassword === repeatPassword) {
      fetchCodePassword(email!, newPassword);
    } else {
      setErrorRepeat(ERROR.REENTERED_PASSWORD);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error || errorRepeat) {
      timer = setTimeout(() => {
        setErrorRepeat("");
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, errorRepeat]);

  useEffect(() => {
    if (!loading && !error) {
      setVisibleFieldCode(true);
    }
  }, [loading, error]);

  return (
    <FetchWrapper loading={loading} error={error || errorRepeat}>
      {visible && (
        <Box>
          <PopupComponent
            visible={visibleFieldCode}
            setVisible={setVisibleFieldCode}
          >
            <VerificationPassword
              email={email!}
              setVisible={setVisibleFieldCode}
            />
          </PopupComponent>
          <Box className={styles.inputs__wrapper}>
            <TextField
              label="Enter your password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Repeat password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              fullWidth
            />
          </Box>
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={sendCode}>
              Send Verification code on email
            </Button>
            <Button variant="contained" fullWidth onClick={closeNameField}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default ChangePassword;
