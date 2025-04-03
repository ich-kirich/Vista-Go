import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UpdateGuide.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function UpdateGuide() {
  const [chooseGuide, setChooseGuide] = useState("");
  const [nameGuide, setNameGuide] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { fetchGuides, fetchUpdateGuide } = useActions();
  const guide = useTypedSelector((state) => state.guide);
  useEffect(() => {
    fetchGuides();
  }, [guide.loading]);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  const selectGuide = (value: string) => {
    setChooseGuide(value);
  };

  const updateGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateGuide(Number(chooseGuide), nameGuide, imageGuide);
  };

  const newNameGuide = (value: string) => {
    const error = validateName(value);
    setValidationError(error);
    setNameGuide(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageGuide(file);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={guide.loading} error={guide.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.update.guide.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.update.guide.select_label")}
          </Typography>
          <NativeSelect
            value={chooseGuide}
            onChange={(e) => selectGuide(e.target.value)}
            variant="standard"
          >
            {guides &&
              guides.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </NativeSelect>
          <TextField
            label={t("admin_page.update.guide.name")}
            type="text"
            value={nameGuide}
            onChange={(e) => newNameGuide(e.target.value)}
            required
            fullWidth
            error={!!validationError}
            helperText={validationError && t(`${validationError}`)}
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.update.guide.image_label")}
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
            onClick={updateGuide}
            disabled={!!validationError || (!imageGuide && !nameGuide)}
          >
            {t("admin_page.update.guide.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateGuide;
