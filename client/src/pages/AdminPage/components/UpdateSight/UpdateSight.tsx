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
  const [nameSight, setNameSight] = useState({
    en: "",
    ru: "",
  });
  const [descriptionSight, setDescriptionSight] = useState({
    en: "",
    ru: "",
  });
  const [priceSight, setPriceSight] = useState("");
  const [distanceSight, setDistanceSight] = useState("");
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
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
  const { fetchTags, fetchAllSights, fetchUpdateSight } = useActions();

  useEffect(() => {
    fetchTags();
    fetchAllSights();
  }, [sight.loading]);

  useEffect(() => {
    if (sights.sights && sights.sights.length > 0) {
      const firstSights = sights.sights[0];
      setChooseSight(String(firstSights.id));
      setNameSight({
        en: firstSights.name.en || "",
        ru: firstSights.name.ru || "",
      });
      setDescriptionSight({
        en: firstSights.description.en || "",
        ru: firstSights.description.ru || "",
      });
    }
  }, [sights]);

  useEffect(() => {
    const selectedSight = sights.sights?.find(
      (elem) => elem.id === Number(chooseSight),
    );
    if (selectedSight) {
      setNameSight(selectedSight.name);
      setDescriptionSight(selectedSight.description);
      setPriceSight(selectedSight.price);
      setDistanceSight(selectedSight.distance);
      const updatedTagIds = selectedSight.tags.map((item) => item.id);
      setTagIdsSight(updatedTagIds);
      setNumberTags(
        Array.from({ length: updatedTagIds.length }, (_, i) => i + 1),
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
      price: priceSight,
      distance: distanceSight,
      tagIds: tagIdsSight,
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

  const newPriceSight = (value: string) => {
    setPriceSight(value);
  };

  const newDistanceSight = (value: string) => {
    setDistanceSight(value);
  };

  const addTag = () => {
    setNumberTags([...numberTags, numberTags.length + 1]);
    fetchTags();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageSight(file);
  };

  const selectTag = (value: string, idBlock: number) => {
    const newTagId = Number(value);
    setTagIdsSight((prev) => {
      const updated = [...prev];
      updated[idBlock - 1] = newTagId;
      return updated;
    });
  };

  const deleteBlocksSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTagIdsSight((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
    setNumberTags((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
  };

  const isFormValid = () => {
    const hasChanges =
      nameSight.en ||
      nameSight.ru ||
      descriptionSight.en ||
      descriptionSight.ru ||
      priceSight ||
      distanceSight ||
      imageSight ||
      tagIdsSight.length > 0;

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
            <Typography variant="h6" component="h2">
              {t("admin_page.update.sight.name")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.update.sight.name")} (English)`}
              type="text"
              value={nameSight.en}
              onChange={(e) => newNameSight(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.name.en}
              helperText={
                validationErrors.name.en && t(validationErrors.name.en)
              }
            />

            <Typography variant="h6" component="h2">
              {t("admin_page.update.sight.description_label")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.update.sight.description")} (English)`}
              type="text"
              multiline
              rows={4}
              value={descriptionSight.en}
              onChange={(e) => newDescriptionSight(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.description.en}
              helperText={
                validationErrors.description.en &&
                t(validationErrors.description.en)
              }
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.update.sight.name")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.sight.name")} (Русский)`}
              type="text"
              value={nameSight.ru}
              onChange={(e) => newNameSight(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.name.ru}
              helperText={
                validationErrors.name.ru && t(validationErrors.name.ru)
              }
            />

            <Typography variant="h6" component="h2">
              {t("admin_page.update.sight.description_label")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.sight.description")} (Русский)`}
              type="text"
              multiline
              rows={4}
              value={descriptionSight.ru}
              onChange={(e) => newDescriptionSight(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.description.ru}
              helperText={
                validationErrors.description.ru &&
                t(validationErrors.description.ru)
              }
            />
          </Box>

          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.price_label")}
          </Typography>
          <TextField
            label={t("admin_page.update.sight.price")}
            type="text"
            value={priceSight}
            onChange={(e) => newPriceSight(e.target.value)}
            fullWidth
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.distance_label")}
          </Typography>
          <TextField
            label={t("admin_page.update.sight.distance")}
            type="text"
            value={distanceSight}
            onChange={(e) => newDistanceSight(e.target.value)}
            fullWidth
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
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
                  sx={{ flexGrow: 1 }}
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
                  className={styles.select__delete}
                  onClick={(e) => deleteBlocksSelect(elem, e)}
                  sx={{ ml: 1, cursor: "pointer" }}
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
