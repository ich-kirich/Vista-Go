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
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./UpdateSight.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function UpdateSight() {
  const [chooseSight, setChooseSight] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [nameSight, setNameSight] = useState({ en: "", ru: "" });
  const [descriptionSight, setDescriptionSight] = useState({ en: "", ru: "" });
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [guideIdsSight, setGuideIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
  const [numberGuides, setNumberGuides] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();
  const [isClick, setIsClick] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: { en: null as string | null, ru: null as string | null },
    description: { en: null as string | null, ru: null as string | null },
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;
  const sights = useTypedSelector((state) => state.sights);
  const sight = useTypedSelector((state) => state.sight);
  const { tags, error, loading } = useTypedSelector((state) => state.tags);
  const guides = useTypedSelector((state) => state.guides);
  const { fetchTags, fetchAllSights, fetchUpdateSight, fetchGuides } =
    useActions();

  useEffect(() => {
    fetchTags();
    fetchAllSights();
    fetchGuides();
  }, [sight.loading]);

  useEffect(() => {
    if (sights.sights && sights.sights.length > 0) {
      const firstSight = sights.sights[0];
      setChooseSight(String(firstSight.id));
      setNameSight(firstSight.name);
      setDescriptionSight(firstSight.description);
    }
  }, [sights]);

  useEffect(() => {
    const selectedSight = sights.sights?.find(
      (elem) => elem.id === Number(chooseSight),
    );
    if (selectedSight) {
      setNameSight(selectedSight.name);
      setDescriptionSight(selectedSight.description);

      const updatedTagIds = selectedSight.tags.map((item) => item.id);
      setTagIdsSight(updatedTagIds);
      setNumberTags(
        Array.from({ length: updatedTagIds.length }, (_, i) => i + 1),
      );

      const updatedGuideIds =
        selectedSight.guides?.map((item) => item.id) || [];
      setGuideIdsSight(updatedGuideIds);
      setNumberGuides(
        Array.from({ length: updatedGuideIds.length }, (_, i) => i + 1),
      );
    }
  }, [chooseSight, sights.sights]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const selectSight = (value: string) => {
    setChooseSight(value);
  };

  const updateSight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateSight({
      id: Number(chooseSight),
      name: nameSight,
      description: descriptionSight,
      tagIds: tagIdsSight,
      guideIds: guideIdsSight,
      image: imageSight,
    });
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

  const selectTag = (value: string, idBlock: number) => {
    const newTagId = Number(value);
    setTagIdsSight((prev) => {
      const updated = [...prev];
      updated[idBlock - 1] = newTagId;
      return updated;
    });
  };

  const selectGuide = (value: string, idBlock: number) => {
    const newGuideId = Number(value);
    setGuideIdsSight((prev) => {
      const updated = [...prev];
      updated[idBlock - 1] = newGuideId;
      return updated;
    });
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
    const hasChanges =
      nameSight.en ||
      nameSight.ru ||
      descriptionSight.en ||
      descriptionSight.ru ||
      imageSight ||
      tagIdsSight.length > 0 ||
      guideIdsSight.length > 0;

    const noErrors =
      !validationErrors.name.en &&
      !validationErrors.name.ru &&
      !validationErrors.description.en &&
      !validationErrors.description.ru;

    return chooseSight && hasChanges && noErrors;
  };

  return (
    <FetchWrapper loading={sights.loading} error={sights.error}>
      {isClick ? (
        <FetchWrapper loading={sight.loading} error={sight.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.update.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.select_label")}
          </Typography>
          <NativeSelect
            value={chooseSight}
            onChange={(e) => selectSight(e.target.value)}
            variant="standard"
            fullWidth
          >
            {sights.sights?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name[language] || item.name.en}
              </option>
            ))}
          </NativeSelect>

          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="English" />
            <Tab label="Русский" />
          </Tabs>

          <Box hidden={currentTab !== 0}>
            <Typography variant="h6">
              {t("admin_page.update.sight.name")} (English)
            </Typography>
            <TextField
              fullWidth
              label={`${t("admin_page.update.sight.name")} (English)`}
              value={nameSight.en}
              onChange={(e) => newNameSight(e.target.value, "en")}
              error={!!validationErrors.name.en}
            />
            <Typography variant="h6">
              {t("admin_page.update.sight.description")} (English)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={descriptionSight.en}
              onChange={(e) => newDescriptionSight(e.target.value, "en")}
              error={!!validationErrors.description.en}
            />
          </Box>
          <Box hidden={currentTab !== 1}>
            <Typography variant="h6">
              {t("admin_page.update.sight.name")} (Русский)
            </Typography>
            <TextField
              fullWidth
              label={`${t("admin_page.update.sight.name")} (Русский)`}
              value={nameSight.ru}
              onChange={(e) => newNameSight(e.target.value, "ru")}
              error={!!validationErrors.name.ru}
            />
            <Typography variant="h6">
              {t("admin_page.update.sight.description")} (Русский)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={descriptionSight.ru}
              onChange={(e) => newDescriptionSight(e.target.value, "ru")}
              error={!!validationErrors.description.ru}
            />
          </Box>

          <Typography variant="h6">
            {t("admin_page.update.sight.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.image__upload}
          />
          <Button variant="text" fullWidth onClick={addTag}>
            {t("admin_page.update.sight.tag_button")}
          </Button>
          <FetchWrapper loading={loading} error={error}>
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
                  {tags?.map((item) => (
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
            {t("admin_page.update.sight.add_guide")}
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
            onClick={updateSight}
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {t("admin_page.update.sight.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateSight;
