import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UpdateGuide.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function UpdateGuide() {
  const [chooseGuide, setChooseGuide] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [nameGuide, setNameGuide] = useState({ en: "", ru: "" });
  const [descriptionGuide, setDescriptionGuide] = useState({ en: "", ru: "" });
  const [contacts, setContacts] = useState("");
  const [cityIds, setCityIds] = useState<number[]>([]);
  const [sightIds, setSightIds] = useState<number[]>([]);
  const [imageGuide, setImageGuide] = useState<File>();
  const [isClick, setIsClick] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    nameGuide_en: string | null;
    nameGuide_ru: string | null;
  }>({ nameGuide_en: null, nameGuide_ru: null });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const {
    fetchGuides,
    fetchAllSights,
    fetchCities,
    fetchUpdateGuide,
    clearErrors,
  } = useActions();
  const guide = useTypedSelector((state) => state.guide);
  const sights = useTypedSelector((state) => state.sights);
  const cities = useTypedSelector((state) => state.cities);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  useEffect(() => {
    fetchGuides();
    fetchAllSights();
    fetchCities();
  }, [guide.loading]);

  const timeoutRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (cities.error || sights.error || guide.error || error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["cities", "sights", "guide", "guides"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cities.error, sights.error, guide.error, error]);

  useEffect(() => {
    if (guides?.length) {
      const firstGuide = guides[0];
      setChooseGuide(String(firstGuide.id));
      setNameGuide(firstGuide.name);
      setDescriptionGuide(firstGuide.description);
      setContacts(firstGuide.contacts);
      setCityIds(firstGuide.cities.map((city) => city.id));
      setSightIds(firstGuide.sights.map((sight) => sight.id));
    }
  }, [guides]);

  useEffect(() => {
    const selectedGuide = guides?.find((g) => g.id === Number(chooseGuide));
    if (selectedGuide) {
      setNameGuide(selectedGuide.name);
      setDescriptionGuide(selectedGuide.description);
      setContacts(selectedGuide.contacts);
      setCityIds(selectedGuide.cities.map((city) => city.id));
      setSightIds(selectedGuide.sights.map((sight) => sight.id));
    }
  }, [chooseGuide, guides]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const selectGuide = (value: string) => {
    setChooseGuide(value);
  };

  const updateGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateGuide(
      Number(chooseGuide),
      nameGuide,
      descriptionGuide,
      contacts,
      imageGuide,
      cityIds,
      sightIds,
    );
  };

  const newNameGuide = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, [`nameGuide_${lang}`]: error }));
    setNameGuide((prev) => ({ ...prev, [lang]: value }));
  };

  const newDescriptionGuide = (value: string, lang: "en" | "ru") => {
    setDescriptionGuide((prev) => ({ ...prev, [lang]: value }));
  };

  const newContactsGuide = (value: string) => {
    setContacts(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImageGuide(event.target.files[0]);
    }
  };

  const addCity = () => {
    if (!cities.cities?.length) return;
    const availableCity = cities.cities.find(
      (city) => !cityIds.includes(city.id),
    );
    if (availableCity) {
      setCityIds((prev) => [...prev, availableCity.id]);
    }
  };

  const addSight = () => {
    if (!sights.sights?.length) return;
    const availableSight = sights.sights.find(
      (sight) => !sightIds.includes(sight.id),
    );
    if (availableSight) {
      setSightIds((prev) => [...prev, availableSight.id]);
    }
  };

  const selectCity = (value: string, idx: number) => {
    const updated = [...cityIds];
    updated[idx] = Number(value);
    setCityIds(updated);
  };

  const selectSight = (value: string, idx: number) => {
    const updated = [...sightIds];
    updated[idx] = Number(value);
    setSightIds(updated);
  };

  const deleteCitySelect = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCityIds((prev) => prev.filter((_, i) => i !== idx));
  };

  const deleteSightSelect = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSightIds((prev) => prev.filter((_, i) => i !== idx));
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
          <Typography variant="h6">
            {t("admin_page.update.guide.select_label")}
          </Typography>
          <NativeSelect
            value={chooseGuide}
            onChange={(e) => selectGuide(e.target.value)}
            variant="standard"
            fullWidth
          >
            {guides?.map((item) => (
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
              {t("admin_page.update.guide.name")} (English)
            </Typography>
            <TextField
              value={nameGuide.en}
              onChange={(e) => newNameGuide(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.nameGuide_en}
              helperText={
                validationErrors.nameGuide_en &&
                t(`${validationErrors.nameGuide_en}`)
              }
            />
            <Typography variant="h6">
              {t("admin_page.update.guide.description")} (English)
            </Typography>
            <TextField
              value={descriptionGuide.en}
              onChange={(e) => newDescriptionGuide(e.target.value, "en")}
              fullWidth
              multiline
              rows={4}
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6">
              {t("admin_page.update.guide.name")} (Русский)
            </Typography>
            <TextField
              value={nameGuide.ru}
              onChange={(e) => newNameGuide(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.nameGuide_ru}
              helperText={
                validationErrors.nameGuide_ru &&
                t(`${validationErrors.nameGuide_ru}`)
              }
            />
            <Typography variant="h6">
              {t("admin_page.update.guide.description")} (Русский)
            </Typography>
            <TextField
              value={descriptionGuide.ru}
              onChange={(e) => newDescriptionGuide(e.target.value, "ru")}
              fullWidth
              multiline
              rows={4}
            />
          </Box>

          <Typography variant="h6">
            {t("admin_page.update.guide.contacts")}
          </Typography>
          <TextField
            value={contacts}
            onChange={(e) => newContactsGuide(e.target.value)}
            fullWidth
          />

          <Typography variant="h6">
            {t("admin_page.update.guide.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            className={styles.image__upload}
          />

          <Button
            variant="text"
            fullWidth
            onClick={addCity}
            disabled={
              !cities.cities?.some((city) => !cityIds.includes(city.id))
            }
          >
            {t("admin_page.update.guide.add_city")}
          </Button>

          {cityIds.map((cityId, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={cityId}
                onChange={(e) => selectCity(e.target.value, idx)}
                variant="standard"
                fullWidth
              >
                {cities.cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name[language] || city.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                className={styles.select__delete}
                onClick={(e) => deleteCitySelect(idx, e)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button
            variant="text"
            fullWidth
            onClick={addSight}
            disabled={
              !sights.sights?.some((sight) => !sightIds.includes(sight.id))
            }
          >
            {t("admin_page.update.guide.add_sight")}
          </Button>

          {sightIds.map((sightId, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={sightId}
                onChange={(e) => selectSight(e.target.value, idx)}
                variant="standard"
                fullWidth
              >
                {sights.sights?.map((sight) => (
                  <option key={sight.id} value={sight.id}>
                    {sight.name[language] || sight.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                className={styles.select__delete}
                onClick={(e) => deleteSightSelect(idx, e)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            onClick={updateGuide}
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {t("admin_page.update.guide.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateGuide;
