import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { ERROR_REPEAT } from "../../libs/constants";
import { IChangePasswordProps } from "../../types/types";
import Loader from "../Loader/Loader";
import PopupComponent from "../PopupComponent/PopupComponent";
import VerificationPassword from "../VerificationPassword/VerificationPassword";
import ViewError from "../ViewError/ViewError";
import styles from "./ChangePassword.module.scss";

function ChangePassword(props: IChangePasswordProps) {
  const { visible, setVisible, email } = props;
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [visibleFieldCode, setVisibleFieldCode] = useState(false);
  const [errorRepeat, setErrorRepeat] = useState("");

  const { fetchCodePassword } = useActions();
  const { error, loading } = useTypedSelector((state) => state.codepass);

  const closeNameField = () => {
    setVisible(false);
  };

  const sendCode = () => {
    setDisplayError(true);
    if (newPassword === repeatPassword) {
      fetchCodePassword(email!, newPassword);
    } else {
      setErrorRepeat(ERROR_REPEAT);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error || errorRepeat) {
      timer = setTimeout(() => {
        setDisplayError(false);
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
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {(error || errorRepeat) && displayError && (
            <ViewError>{error || errorRepeat}</ViewError>
          )}
        </Box>
      )}
      {visible && (
        <Box>
          <PopupComponent
            visible={visibleFieldCode}
            setVisible={setVisibleFieldCode}
          >
            <VerificationPassword
              email={email!}
              password={newPassword}
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
    </Box>
  );
}

export default ChangePassword;
