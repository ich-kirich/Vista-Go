import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import useActions from "../../../../hooks/useActions";
import { IChangeUsernameProps } from "../../../../types/types";
import { useTranslation } from "react-i18next";
import styles from "./ChangeUsername.module.scss";

function ChangeUsername(props: IChangeUsernameProps) {
  const { visible, setVisible } = props;
  const [newName, setNewName] = useState("");

  const { fetchUpdateUsername } = useActions();
  const { t } = useTranslation();

  const updateName = () => {
    fetchUpdateUsername(newName);
  };

  const closeNameField = () => {
    setVisible(!visible);
  };

  return (
    <Box>
      {visible && (
        <Box className={styles.input__wrapper}>
          <TextField
            label={t("change_username.enter_name")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            fullWidth
          />
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={updateName}>
              {t("change_username.save_name")}
            </Button>
            <Button variant="contained" fullWidth onClick={closeNameField}>
              {t("change_username.cancel")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ChangeUsername;
