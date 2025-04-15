import { Box, Typography, Button, TextField, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./AddTag.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function AddTag() {
  const [isClick, setIsClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [nameTag, setNameTag] = useState({
    en: "",
    ru: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    en: null as string | null,
    ru: null as string | null,
  });
  const { t } = useTranslation();

  const { fetchAddTag } = useActions();
  const { error, loading } = useTypedSelector((state) => state.tag);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameTag = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [lang]: error,
    }));
    setNameTag((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const addTag = () => {
    setIsClick(true);
    fetchAddTag(nameTag);
  };

  const isFormValid = () => {
    return (
      nameTag.en.trim() &&
      nameTag.ru.trim() &&
      !validationErrors.en &&
      !validationErrors.ru
    );
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.add.tag.success")}
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
              {t("admin_page.add.tag.name_label")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.add.tag.name")} (English)`}
              type="text"
              value={nameTag.en}
              onChange={(e) => newNameTag(e.target.value, "en")}
              required
              fullWidth
              error={!!validationErrors.en}
              helperText={validationErrors.en && t(validationErrors.en)}
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.add.tag.name_label")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.add.tag.name")} (Русский)`}
              type="text"
              value={nameTag.ru}
              onChange={(e) => newNameTag(e.target.value, "ru")}
              required
              fullWidth
              error={!!validationErrors.ru}
              helperText={validationErrors.ru && t(validationErrors.ru)}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={addTag}
            disabled={!isFormValid()}
          >
            {t("admin_page.add.tag")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddTag;
