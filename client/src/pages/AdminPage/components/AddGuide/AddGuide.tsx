import { Box, Typography, TextField, Button, Tabs, Tab } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./AddGuide.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function AddGuide() {
  const [isClick, setIsClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [nameGuide, setNameGuide] = useState({
    en: "",
    ru: "",
  });
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const { t } = useTranslation();

  const { fetchCreateGuide } = useActions();
  const { error, loading } = useTypedSelector((state) => state.guide);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameGuide = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [`nameGuide_${lang}`]: error,
    }));
    setNameGuide((prev) => ({
      ...prev,
      [lang]: value,
    }));
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

  const isFormValid = () => {
    return (
      imageGuide &&
      nameGuide.en &&
      nameGuide.ru &&
      !validationErrors.nameGuide_en &&
      !validationErrors.nameGuide_ru
    );
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
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="English" />
            <Tab label="Русский" />
          </Tabs>

          <Box hidden={currentTab !== 0}>
            <Typography variant="h6" component="h2">
              {t("admin_page.add.guide.name")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.add.guide.name")} (English)`}
              type="text"
              value={nameGuide.en}
              onChange={(e) => newNameGuide(e.target.value, "en")}
              required
              fullWidth
              error={!!validationErrors.nameGuide_en}
              helperText={
                validationErrors.nameGuide_en &&
                t(`${validationErrors.nameGuide_en}`)
              }
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.add.guide.name")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.add.guide.name")} (Русский)`}
              type="text"
              value={nameGuide.ru}
              onChange={(e) => newNameGuide(e.target.value, "ru")}
              required
              fullWidth
              error={!!validationErrors.nameGuide_ru}
              helperText={
                validationErrors.nameGuide_ru &&
                t(`${validationErrors.nameGuide_ru}`)
              }
            />
          </Box>

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
            disabled={!isFormValid()}
          >
            {t("admin_page.add.guide")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddGuide;
