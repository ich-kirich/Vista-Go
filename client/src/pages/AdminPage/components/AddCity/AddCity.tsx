import {
  Box,
  Typography,
  TextField,
  Button,
  NativeSelect,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./AddCity.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateLat, validateLon, validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function AddCity() {
  const [isClick, setIsClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [countryCity, setCountryCity] = useState({ en: "", ru: "" });
  const [nameCity, setNameCity] = useState({ en: "", ru: "" });
  const [latCity, setLatCity] = useState("");
  const [lonCity, setLonCity] = useState("");
  const [sightIdsCity, setSightIdsCity] = useState<number[]>([]);
  const [guideIdsCity, setGuideIdsCity] = useState<number[]>([]);
  const [imageCity, setImageCity] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchCreateCity, fetchAllSights, fetchGuides, clearErrors } =
    useActions();
  const sights = useTypedSelector((state) => state.sights);
  const city = useTypedSelector((state) => state.city);
  const guides = useTypedSelector((state) => state.guides);

  useEffect(() => {
    fetchGuides();
    fetchAllSights();
  }, []);

  useEffect(() => {
    if (guides.error || city.error || sights.error) {
      timeoutRef.current = setTimeout(() => {
        clearErrors(["guides", "city", "sights"]);
        setIsClick(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [guides.error, city.error, sights.error]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, [`nameCity_${lang}`]: error }));
    setNameCity((prev) => ({ ...prev, [lang]: value }));
  };

  const newCountryCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [`countryCity_${lang}`]: error,
    }));
    setCountryCity((prev) => ({ ...prev, [lang]: value }));
  };

  const newLatCity = (value: string) => {
    const error = validateLat(value);
    setValidationErrors((prev) => ({ ...prev, latCity: error }));
    setLatCity(value);
  };

  const newLonCity = (value: string) => {
    const error = validateLon(value);
    setValidationErrors((prev) => ({ ...prev, lonCity: error }));
    setLonCity(value);
  };

  const addSight = () => {
    const availableSight = sights.sights?.find(
      (s) => !sightIdsCity.includes(s.id),
    );
    if (availableSight) {
      setSightIdsCity((prev) => [...prev, availableSight.id]);
    }
  };

  const addGuide = () => {
    const availableGuide = guides.guides?.find(
      (g) => !guideIdsCity.includes(g.id),
    );
    if (availableGuide) {
      setGuideIdsCity((prev) => [...prev, availableGuide.id]);
    }
  };

  const selectSight = (value: string, index: number) => {
    const updated = [...sightIdsCity];
    updated[index] = Number(value);
    setSightIdsCity(updated);
  };

  const selectGuide = (value: string, index: number) => {
    const updated = [...guideIdsCity];
    updated[index] = Number(value);
    setGuideIdsCity(updated);
  };

  const deleteSight = (index: number) => {
    setSightIdsCity((prev) => prev.filter((_, idx) => idx !== index));
  };

  const deleteGuide = (index: number) => {
    setGuideIdsCity((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageCity(event.target.files[0]);
    }
  };

  const addCity = () => {
    setIsClick(true);
    if (imageCity) {
      fetchCreateCity({
        country: countryCity,
        name: nameCity,
        lat: latCity,
        lon: lonCity,
        sightIds: sightIdsCity,
        guideIds: guideIdsCity,
        image: imageCity,
      });
    }
  };

  const isFormValid = () => {
    return (
      imageCity &&
      nameCity.en &&
      nameCity.ru &&
      countryCity.en &&
      countryCity.ru &&
      latCity &&
      lonCity &&
      sightIdsCity.length > 0 &&
      guideIdsCity.length > 0 &&
      !Object.values(validationErrors).some(Boolean)
    );
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={city.loading} error={city.error}>
          <Typography variant="h6">
            {t("admin_page.add.city.success")}
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
              {t("admin_page.add.city.name")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.add.city.name")} (English)`}
              type="text"
              value={nameCity.en}
              onChange={(e) => newNameCity(e.target.value, "en")}
              required
              fullWidth
              error={!!validationErrors.nameCity_en}
              helperText={
                validationErrors.nameCity_en &&
                t(`${validationErrors.nameCity_en}`)
              }
            />
            <Typography variant="h6" component="h2">
              {t("admin_page.add.city.country_label")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.add.city.country")} (English)`}
              type="text"
              value={countryCity.en}
              onChange={(e) => newCountryCity(e.target.value, "en")}
              required
              fullWidth
              error={!!validationErrors.countryCity_en}
              helperText={
                validationErrors.countryCity_en &&
                t(`${validationErrors.countryCity_en}`)
              }
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.add.city.name")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.add.city.name")} (Русский)`}
              type="text"
              value={nameCity.ru}
              onChange={(e) => newNameCity(e.target.value, "ru")}
              required
              fullWidth
              error={!!validationErrors.nameCity_ru}
              helperText={
                validationErrors.nameCity_ru &&
                t(`${validationErrors.nameCity_ru}`)
              }
            />
            <Typography variant="h6" component="h2">
              {t("admin_page.add.city.country_label")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.add.city.country")} (Русский)`}
              type="text"
              value={countryCity.ru}
              onChange={(e) => newCountryCity(e.target.value, "ru")}
              required
              fullWidth
              error={!!validationErrors.countryCity_ru}
              helperText={
                validationErrors.countryCity_ru &&
                t(`${validationErrors.countryCity_ru}`)
              }
            />
          </Box>

          <Typography variant="h6">
            {t("admin_page.add.city.lat_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.city.lat")}
            type="text"
            value={latCity}
            onChange={(e) => newLatCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.latCity}
            helperText={
              validationErrors.latCity && t(`${validationErrors.latCity}`)
            }
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.add.city.lon_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.city.lon")}
            type="text"
            value={lonCity}
            onChange={(e) => newLonCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.lonCity}
            helperText={
              validationErrors.lonCity && t(`${validationErrors.lonCity}`)
            }
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.add.city.image_label")}:
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />

          <Button
            variant="text"
            fullWidth
            onClick={addSight}
            disabled={
              !sights.sights?.some((sight) => !sightIdsCity.includes(sight.id))
            }
          >
            {t("admin_page.add.city.sight")}
          </Button>
          {sightIdsCity.map((id, index) => (
            <Box key={id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <NativeSelect
                value={id}
                onChange={(e) => selectSight(e.target.value, index)}
                fullWidth
              >
                {sights.sights?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name[language] || s.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                className={styles.select__delete}
                onClick={() => deleteSight(index)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button
            variant="text"
            fullWidth
            onClick={addGuide}
            disabled={
              !guides.guides?.some((guide) => !guideIdsCity.includes(guide.id))
            }
          >
            {t("admin_page.add.city.guide")}
          </Button>
          {guideIdsCity.map((id, index) => (
            <Box key={id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <NativeSelect
                value={id}
                onChange={(e) => selectGuide(e.target.value, index)}
                fullWidth
              >
                {guides.guides?.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name[language] || g.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                className={styles.select__delete}
                onClick={() => deleteGuide(index)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            onClick={addCity}
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {t("admin_page.add.city")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddCity;
