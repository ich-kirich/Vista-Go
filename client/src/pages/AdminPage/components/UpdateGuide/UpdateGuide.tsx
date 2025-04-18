import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
  Tabs,
  Tab,
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
  const [currentTab, setCurrentTab] = useState(0);
  const [nameGuide, setNameGuide] = useState({
    en: "",
    ru: "",
  });
  const [isClick, setIsClick] = useState(false);
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const { t } = useTranslation();

  const { fetchGuides, fetchUpdateGuide } = useActions();
  const guide = useTypedSelector((state) => state.guide);

  useEffect(() => {
    fetchGuides();
  }, [guide.loading]);

  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  useEffect(() => {
    if (guides && guides.length > 0) {
      const firstGuides = guides[0];
      setChooseGuide(String(firstGuides.id));
      setNameGuide({
        en: firstGuides.name.en || "",
        ru: firstGuides.name.ru || "",
      });
    }
  }, [guides]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const selectGuide = (value: string) => {
    const selectedGuide = guides?.find((g) => g.id === Number(value));
    if (selectedGuide) {
      setNameGuide({
        en: selectedGuide.name.en || "",
        ru: selectedGuide.name.ru || "",
      });
    }
    setChooseGuide(value);
  };

  const updateGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateGuide(Number(chooseGuide), nameGuide, imageGuide);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageGuide(file);
  };

  const isFormValid = () => {
    return (
      chooseGuide &&
      (nameGuide.en || nameGuide.ru || imageGuide) &&
      !validationErrors.nameGuide_en &&
      !validationErrors.nameGuide_ru
    );
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
            fullWidth
          >
            {guides &&
              guides.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name.en} / {item.name.ru}
                </option>
              ))}
          </NativeSelect>

          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="English" />
            <Tab label="Русский" />
          </Tabs>

          <Box hidden={currentTab !== 0}>
            <Typography variant="h6" component="h2">
              {t("admin_page.update.guide.name")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.update.guide.name")} (English)`}
              type="text"
              value={nameGuide.en}
              onChange={(e) => newNameGuide(e.target.value, "en")}
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
              {t("admin_page.update.guide.name")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.guide.name")} (Русский)`}
              type="text"
              value={nameGuide.ru}
              onChange={(e) => newNameGuide(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.nameGuide_ru}
              helperText={
                validationErrors.nameGuide_ru &&
                t(`${validationErrors.nameGuide_ru}`)
              }
            />
          </Box>

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
            disabled={!isFormValid()}
          >
            {t("admin_page.update.guide.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateGuide;
