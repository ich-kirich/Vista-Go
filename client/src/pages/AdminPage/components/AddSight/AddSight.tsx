import {
  Box,
  Typography,
  TextField,
  Button,
  NativeSelect,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./AddSight.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function AddSight() {
  const [isClick, setIsClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [nameSight, setNameSight] = useState({ en: "", ru: "" });
  const [descriptionSight, setDescriptionSight] = useState({ en: "", ru: "" });
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [guideIdsSight, setGuideIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
  const [numberGuides, setNumberGuides] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();
  const [validationErrors, setValidationErrors] = useState({
    name: { en: null as string | null, ru: null as string | null },
    description: { en: null as string | null, ru: null as string | null },
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchCreateSight, fetchTags, fetchGuides } = useActions();
  const { error, loading } = useTypedSelector((state) => state.sight);
  const tags = useTypedSelector((state) => state.tags);
  const guides = useTypedSelector((state) => state.guides);

  useEffect(() => {
    fetchTags();
    fetchGuides();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameSight = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: error },
    }));
    setNameSight((prev) => ({ ...prev, [lang]: value }));
  };

  const newDescriptionSight = (value: string, lang: "en" | "ru") => {
    setDescriptionSight((prev) => ({ ...prev, [lang]: value }));
  };

  const addSight = () => {
    setIsClick(true);
    if (imageSight) {
      fetchCreateSight({
        name: nameSight,
        description: descriptionSight,
        tagIds: tagIdsSight,
        guideIds: guideIdsSight,
        image: imageSight,
      });
    }
  };

  const addTag = () => {
    setNumberTags([...numberTags, numberTags.length + 1]);
  };

  const addGuide = () => {
    setNumberGuides([...numberGuides, numberGuides.length + 1]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      setImageSight(file);
    }
  };

  const selectTag = (value: string, selectId: number) => {
    const updated = [...tagIdsSight];
    updated[selectId - 1] = Number(value);
    setTagIdsSight(updated);
  };

  const selectGuide = (value: string, selectId: number) => {
    const updated = [...guideIdsSight];
    updated[selectId - 1] = Number(value);
    setGuideIdsSight(updated);
  };

  const deleteTagSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTagIdsSight((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
    setNumberTags((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
  };

  const deleteGuideSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGuideIdsSight((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
    setNumberGuides((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
  };

  const isFormValid = () => {
    return (
      imageSight &&
      nameSight.en &&
      nameSight.ru &&
      descriptionSight.en &&
      descriptionSight.ru &&
      tagIdsSight.length > 0 &&
      !Object.values(validationErrors.name).some(Boolean) &&
      !Object.values(validationErrors.description).some(Boolean)
    );
  };

  return (
    <>
      {isClick ? (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6">
            {t("admin_page.add.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="English" />
            <Tab label="Русский" />
          </Tabs>

          <Box hidden={currentTab !== 0}>
            <Typography variant="h6">
              {t("admin_page.add.sight.name_label")} (English)
            </Typography>
            <TextField
              label={t("admin_page.add.sight.name")}
              type="text"
              value={nameSight.en}
              onChange={(e) => newNameSight(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.name.en}
            />
            <Typography variant="h6">
              {t("admin_page.add.sight.description_label")} (English)
            </Typography>
            <TextField
              label={t("admin_page.add.sight.description")}
              type="text"
              multiline
              rows={4}
              value={descriptionSight.en}
              onChange={(e) => newDescriptionSight(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.description.en}
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6">
              {t("admin_page.add.sight.name_label")} (Русский)
            </Typography>
            <TextField
              label={t("admin_page.add.sight.name")}
              type="text"
              value={nameSight.ru}
              onChange={(e) => newNameSight(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.name.ru}
            />
            <Typography variant="h6">
              {t("admin_page.add.sight.description_label")} (Русский)
            </Typography>
            <TextField
              label={t("admin_page.add.sight.description")}
              type="text"
              multiline
              rows={4}
              value={descriptionSight.ru}
              onChange={(e) => newDescriptionSight(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.description.ru}
            />
          </Box>

          <Typography variant="h6">
            {t("admin_page.add.sight.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.image__upload}
          />

          <Button variant="text" fullWidth onClick={addTag}>
            {t("admin_page.add.sight.tag_button")}
          </Button>
          <FetchWrapper loading={tags.loading} error={tags.error}>
            {numberTags.map((elem) => (
              <Box
                key={elem}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <NativeSelect
                  value={tagIdsSight[elem - 1] || ""}
                  onChange={(e) => selectTag(e.target.value, elem)}
                  variant="standard"
                  fullWidth
                >
                  {tags.tags?.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={
                        tagIdsSight.includes(item.id) &&
                        tagIdsSight[elem - 1] !== item.id
                      }
                    >
                      {item.name[language] || item.name.en}
                    </option>
                  ))}
                </NativeSelect>
                <CloseIcon
                  onClick={(e) => deleteTagSelect(elem, e)}
                  className={styles.select__delete}
                />
              </Box>
            ))}
          </FetchWrapper>

          <Button variant="text" fullWidth onClick={addGuide}>
            {t("admin_page.add.sight.guide_button")}
          </Button>
          <FetchWrapper loading={guides.loading} error={guides.error}>
            {numberGuides.map((elem) => (
              <Box
                key={elem}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <NativeSelect
                  value={guideIdsSight[elem - 1] || ""}
                  onChange={(e) => selectGuide(e.target.value, elem)}
                  variant="standard"
                  fullWidth
                >
                  {guides.guides?.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      disabled={
                        guideIdsSight.includes(item.id) &&
                        guideIdsSight[elem - 1] !== item.id
                      }
                    >
                      {item.name[language] || item.name.en}
                    </option>
                  ))}
                </NativeSelect>
                <CloseIcon
                  onClick={(e) => deleteGuideSelect(elem, e)}
                  className={styles.select__delete}
                />
              </Box>
            ))}
          </FetchWrapper>

          <Button
            variant="contained"
            fullWidth
            onClick={addSight}
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {t("admin_page.add.sight")}
          </Button>
        </Box>
      )}
    </>
  );
}

export default AddSight;
