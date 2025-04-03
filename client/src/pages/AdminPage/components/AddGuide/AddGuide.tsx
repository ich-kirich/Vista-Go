import { Box, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./AddGuide.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function AddGuide() {
  const [isClick, setIsClick] = useState(false);
  const [nameGuide, setNameGuide] = useState("");
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { fetchCreateGuide } = useActions();
  const { error, loading } = useTypedSelector((state) => state.guide);

  const newNameGuide = (value: string) => {
    const error = validateName(value);
    setValidationError(error);
    setNameGuide(value);
  };

  const addGuide = () => {
    setIsClick(true);
    fetchCreateGuide(nameGuide, imageGuide!);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageGuide(file);
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.add.guide.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.add.guide.name")}:
          </Typography>
          <TextField
            label={t("admin_page.add.guide.name_label")}
            type="text"
            value={nameGuide}
            onChange={(e) => newNameGuide(e.target.value)}
            required
            fullWidth
            error={!!validationError && t(`${validationError}`)}
            helperText={validationError && t(`${validationError}`)}
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.add.guide.image_label")}:
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={addGuide}
            disabled={!!validationError || !imageGuide || !nameGuide}
          >
            {t("admin_page.add.guide")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddGuide;
