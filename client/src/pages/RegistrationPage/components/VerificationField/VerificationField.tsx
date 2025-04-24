import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import Loader from "../../../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import styles from "./VerificationField.module.scss";
import { Routes } from "../../../../libs/enums";

interface IVerificationFieldProps {
  name: string;
  email: string;
}

function VerificationField({ name, email }: IVerificationFieldProps) {
  const [userCode, setUserCode] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { fetchCodeUser } = useActions();
  const { error, loading } = useTypedSelector((state) => state.code);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchCodeUser({ name, email, code: userCode });
    setSendClicked(true);
  };

  useEffect(() => {
    if (sendClicked && !loading && !error) {
      navigate(Routes.LOGIN);
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
              {t(error)}
            </Typography>
          )}
          <Box className={styles.verification__controls}>
            <TextField
              label={t("verification_field.enter_code")}
              type="text"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              required
              fullWidth
            />
            <Box>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                {t("verification_field.send_code")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VerificationField;
