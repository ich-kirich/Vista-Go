import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IVerificationFieldProps } from "../../types/types";
import Loader from "../Loader/Loader";
import styles from "./VerificationFieild.module.scss";

function VerificationField(props: IVerificationFieldProps) {
  const { name, email, password } = props;
  const [userCode, setUserCode] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const navigate = useNavigate();

  const { fetchCode } = useActions();
  const { error, loading } = useTypedSelector((state) => state.code);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchCode(name, email, password, userCode);
    setSendClicked(true);
  };

  useEffect(() => {
    if (sendClicked && !loading && !error) {
      navigate("/");
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

export default VerificationField;
