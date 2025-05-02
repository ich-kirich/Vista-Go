import {
  Box,
  Typography,
  NativeSelect,
  Button,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UpdateTag.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function UpdateTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [nameTag, setNameTag] = useState({
    en: "",
    ru: "",
  });
  const [isClick, setIsClick] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    en: null as string | null,
    ru: null as string | null,
  });
  const { t } = useTranslation();

  const { fetchTags, fetchUpdateTag, clearErrors } = useActions();
  const tag = useTypedSelector((state) => state.tag);

  useEffect(() => {
    fetchTags();
  }, [tag.loading]);

  const { tags, error, loading } = useTypedSelector((state) => state.tags);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (error || tag.error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["tags", "tag"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tag.error, error]);

  useEffect(() => {
    if (tags && tags.length > 0) {
      const firstTag = tags[0];
      setChooseTag(String(firstTag.id));
      setNameTag({
        en: firstTag.name.en || "",
        ru: firstTag.name.ru || "",
      });
    }
  }, [tags]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const selectTag = (value: string) => {
    const selectedTag = tags?.find((t) => t.id === Number(value));
    if (selectedTag) {
      setNameTag({
        en: selectedTag.name.en || "",
        ru: selectedTag.name.ru || "",
      });
      setValidationErrors({
        en: null,
        ru: null,
      });
    }
    setChooseTag(value);
  };

  const updateTag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateTag(Number(chooseTag), nameTag);
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

  const isFormValid = () => {
    return (
      chooseTag &&
      (nameTag.en || nameTag.ru) &&
      !validationErrors.en &&
      !validationErrors.ru
    );
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={tag.loading} error={tag.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.update.tag.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.update.tag.select_label")}
          </Typography>
          <NativeSelect
            value={chooseTag}
            onChange={(e) => selectTag(e.target.value)}
            variant="standard"
            fullWidth
          >
            {tags &&
              tags.map((item) => (
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
              {t("admin_page.update.tag.name")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.update.tag.name")} (English)`}
              type="text"
              value={nameTag.en}
              onChange={(e) => newNameTag(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.en}
              helperText={validationErrors.en && t(`${validationErrors.en}`)}
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.update.tag.name")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.tag.name")} (Русский)`}
              type="text"
              value={nameTag.ru}
              onChange={(e) => newNameTag(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.ru}
              helperText={validationErrors.ru && t(`${validationErrors.ru}`)}
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={updateTag}
            disabled={!isFormValid()}
          >
            {t("admin_page.update.tag.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateTag;
