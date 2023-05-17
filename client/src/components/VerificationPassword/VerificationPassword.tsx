import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IVerificationPassword } from "../../types/types";
import Loader from "../Loader/Loader";
import styles from "./VerificationPassword.module.scss";

function VerificationPassword(props: IVerificationPassword) {
  const { email, password, setVisible } = props;
  const [userCode, setUserCode] = useState("");
  const [sendClicked, setSendClicked] = useState(false);

  const { fetchUpdateUserPassword } = useActions();
  const { error, loading } = useTypedSelector((state) => state.user);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchUpdateUserPassword(userCode, email, password);
    setSendClicked(true);
  };

  useEffect(() => {
    if (sendClicked && !loading && !error) {
      setVisible(false);
    }
  }, [sendClicked, loading, error]);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className={styles.verification__wrapper}>
          {error && (
            <Typography
              variant="h6"
              component="h2"
              className={styles.verification__title}
            >
              {error}
            </Typography>
          )}
          <Box className={styles.verification__controls}>
            <TextField
              label="Enter your code"
              type="text"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              required
              fullWidth
            />
            <Box>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Send Code
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VerificationPassword;
