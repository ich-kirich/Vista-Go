import { Box, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IChangeUsernameProps } from "../../../../types/types";
import { useTranslation } from "react-i18next";
import styles from "./ChangeImage.module.scss";
import useActions from "../../../../hooks/useActions";

function ChangeImage(props: IChangeUsernameProps) {
  const { visible, setVisible } = props;

  const { fetchUpdateUserImage } = useActions();
  const { t } = useTranslation();

  const closeNameField = () => {
    setVisible(!visible);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      fetchUpdateUserImage(file);
    }
  };

  return (
    <Box>
      {visible && (
        <Box className={styles.input__wrapper}>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={closeNameField}>
              {t("change_image.cancel")}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ChangeImage;
