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
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UpdateSight.module.scss";
import { validateLat, validateLon, validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function UpdateSight() {
  const [chooseSight, setChooseSight] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [nameSight, setNameSight] = useState({ en: "", ru: "" });
  const [descriptionSight, setDescriptionSight] = useState({ en: "", ru: "" });
  const [latSight, setLatSight] = useState("");
  const [lonSight, setLonSight] = useState("");
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [guideIdsSight, setGuideIdsSight] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();
  const [isClick, setIsClick] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: { en: null as string | null, ru: null as string | null },
    description: { en: null as string | null, ru: null as string | null },
    latSight: null as string | null,
    lonSight: null as string | null,
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;
  const sights = useTypedSelector((state) => state.sights);
  const sight = useTypedSelector((state) => state.sight);
  const tags = useTypedSelector((state) => state.tags);
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
      setLatSight(String(firstSight.lat));
      setLonSight(String(firstSight.lon));
      setTagIdsSight(firstSight.tags.map((tag) => tag.id));
      setGuideIdsSight(firstSight.guides?.map((guide) => guide.id) || []);
    }
  }, [sights.sights]);

  useEffect(() => {
    const selectedSight = sights.sights?.find(
      (s) => s.id === Number(chooseSight),
    );
    if (selectedSight) {
      setNameSight(selectedSight.name);
      setDescriptionSight(selectedSight.description);
      setLatSight(String(selectedSight.lat));
      setLonSight(String(selectedSight.lon));
      setTagIdsSight(selectedSight.tags.map((tag) => tag.id));
      setGuideIdsSight(selectedSight.guides?.map((guide) => guide.id) || []);
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
      lat: latSight,
      lon: lonSight,
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

  const newLatSight = (value: string) => {
    const error = validateLat(value);
    setValidationErrors((prev) => ({ ...prev, latSight: error }));
    setLatSight(value);
  };

  const newLonSight = (value: string) => {
    const error = validateLon(value);
    setValidationErrors((prev) => ({ ...prev, lonSight: error }));
    setLonSight(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImageSight(event.target.files[0]);
    }
  };

  const addTag = () => {
    const availableTag = tags.tags?.find(
      (tag) => !tagIdsSight.includes(tag.id),
    );
    if (availableTag) {
      setTagIdsSight((prev) => [...prev, availableTag.id]);
    }
  };

  const addGuide = () => {
    const availableGuide = guides.guides?.find(
      (guide) => !guideIdsSight.includes(guide.id),
    );
    if (availableGuide) {
      setGuideIdsSight((prev) => [...prev, availableGuide.id]);
    }
  };

  const selectTag = (value: string, idx: number) => {
    const updated = [...tagIdsSight];
    updated[idx] = Number(value);
    setTagIdsSight(updated);
  };

  const selectGuide = (value: string, idx: number) => {
    const updated = [...guideIdsSight];
    updated[idx] = Number(value);
    setGuideIdsSight(updated);
  };

  const deleteTagSelect = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTagIdsSight((prev) => prev.filter((_, i) => i !== idx));
  };

  const deleteGuideSelect = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setGuideIdsSight((prev) => prev.filter((_, i) => i !== idx));
  };

  const isFormValid = () => {
    return (
      chooseSight &&
      (nameSight.en || nameSight.ru || imageSight) &&
      !validationErrors.name.en &&
      !validationErrors.name.ru &&
      !validationErrors.description.en &&
      !validationErrors.description.ru &&
      latSight !== null &&
      lonSight !== null &&
      !validationErrors.latSight &&
      !validationErrors.lonSight
    );
  };

  return (
    <FetchWrapper
      loading={sights.loading || tags.loading || guides.loading}
      error={sights.error || tags.error || guides.error}
    >
      {isClick ? (
        <FetchWrapper loading={sight.loading} error={sight.error}>
          <Typography variant="h6">
            {t("admin_page.update.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6">
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
            {t("admin_page.update.sight.lat_label")}:
          </Typography>
          <TextField
            label={t("admin_page.update.sight.lat")}
            type="text"
            value={latSight}
            onChange={(e) => newLatSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.latSight}
            helperText={
              validationErrors.latSight && t(`${validationErrors.latSight}`)
            }
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.lon_label")}:
          </Typography>
          <TextField
            label={t("admin_page.update.sight.lon")}
            type="text"
            value={lonSight}
            onChange={(e) => newLonSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.lonSight}
            helperText={
              validationErrors.lonSight && t(`${validationErrors.lonSight}`)
            }
          />

          <Typography variant="h6">
            {t("admin_page.update.sight.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.image__upload}
          />

          <Button
            variant="text"
            fullWidth
            onClick={addTag}
            disabled={!tags.tags?.some((tag) => !tagIdsSight.includes(tag.id))}
          >
            {t("admin_page.update.sight.tag_button")}
          </Button>

          {tagIdsSight.map((tagId, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={tagId}
                onChange={(e) => selectTag(e.target.value, idx)}
                variant="standard"
                fullWidth
              >
                {tags.tags?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name[language] || tag.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                onClick={(e) => deleteTagSelect(idx, e)}
                sx={{ ml: 1, cursor: "pointer" }}
                className={styles.select__delete}
              />
            </Box>
          ))}

          <Button
            variant="text"
            fullWidth
            onClick={addGuide}
            disabled={
              !guides.guides?.some((guide) => !guideIdsSight.includes(guide.id))
            }
          >
            {t("admin_page.update.sight.add_guide")}
          </Button>

          {guideIdsSight.map((guideId, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={guideId}
                onChange={(e) => selectGuide(e.target.value, idx)}
                variant="standard"
                fullWidth
              >
                {guides.guides?.map((guide) => (
                  <option key={guide.id} value={guide.id}>
                    {guide.name[language] || guide.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                onClick={(e) => deleteGuideSelect(idx, e)}
                sx={{ ml: 1, cursor: "pointer" }}
                className={styles.select__delete}
              />
            </Box>
          ))}

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
