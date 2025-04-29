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
import styles from "./UpdateCity.module.scss";
import { validateLat, validateLon, validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function UpdateCity() {
  const [isClick, setIsClick] = useState(false);
  const [chooseCity, setChooseCity] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [countryCity, setCountryCity] = useState({ en: "", ru: "" });
  const [nameCity, setNameCity] = useState({ en: "", ru: "" });
  const [latCity, setLatCity] = useState("");
  const [lonCity, setLonCity] = useState("");
  const [sightIdsCity, setSightIdsCity] = useState<number[]>([]);
  const [guideIdsCity, setGuideIdsCity] = useState<number[]>([]);
  const [imageCity, setImageCity] = useState<File>();
  const [validationErrors, setValidationErrors] = useState({
    name: { en: null as string | null, ru: null as string | null },
    country: { en: null as string | null, ru: null as string | null },
    lat: null as string | null,
    lon: null as string | null,
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;
  const { fetchAllSights, fetchCities, fetchUpdateCity, fetchGuides } =
    useActions();
  const cities = useTypedSelector((state) => state.cities);
  const city = useTypedSelector((state) => state.city);
  const sights = useTypedSelector((state) => state.sights);
  const guides = useTypedSelector((state) => state.guides);

  useEffect(() => {
    fetchAllSights();
    fetchCities();
    fetchGuides();
  }, [city.loading]);

  useEffect(() => {
    if (cities.cities && cities.cities.length > 0) {
      const firstCity = cities.cities[0];
      setChooseCity(String(firstCity.id));
      setCountryCity(firstCity.country);
      setNameCity(firstCity.name);
      setLatCity(firstCity.lat);
      setLonCity(firstCity.lon);
      setSightIdsCity(firstCity.sights.map((s) => s.id));
      setGuideIdsCity(firstCity.guides.map((g) => g.id));
    }
  }, [cities.cities]);

  useEffect(() => {
    const selectedCity = cities.cities?.find(
      (c) => c.id === Number(chooseCity),
    );
    if (selectedCity) {
      setNameCity(selectedCity.name);
      setCountryCity(selectedCity.country);
      setLatCity(selectedCity.lat);
      setLonCity(selectedCity.lon);
      setSightIdsCity(selectedCity.sights.map((s) => s.id));
      setGuideIdsCity(selectedCity.guides.map((g) => g.id));
      setValidationErrors({
        name: { en: null, ru: null },
        country: { en: null, ru: null },
        lat: null,
        lon: null,
      });
    }
  }, [chooseCity, cities.cities]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const selectCity = (value: string) => {
    setChooseCity(value);
  };

  const updateCity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateCity({
      id: Number(chooseCity),
      country: countryCity,
      name: nameCity,
      lat: latCity,
      lon: lonCity,
      sightIds: sightIdsCity,
      guideIds: guideIdsCity,
      image: imageCity,
    });
  };

  const newNameCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      name: { ...prev.name, [lang]: error },
    }));
    setNameCity((prev) => ({ ...prev, [lang]: value }));
  };

  const newCountryCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      country: { ...prev.country, [lang]: error },
    }));
    setCountryCity((prev) => ({ ...prev, [lang]: value }));
  };

  const newLatCity = (value: string) => {
    const error = validateLat(value);
    setValidationErrors((prev) => ({ ...prev, lat: error }));
    setLatCity(value);
  };

  const newLonCity = (value: string) => {
    const error = validateLon(value);
    setValidationErrors((prev) => ({ ...prev, lon: error }));
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

  const deleteSightSelect = (index: number) => {
    setSightIdsCity((prev) => prev.filter((_, idx) => idx !== index));
  };

  const selectGuide = (value: string, index: number) => {
    const updated = [...guideIdsCity];
    updated[index] = Number(value);
    setGuideIdsCity(updated);
  };

  const deleteGuideSelect = (index: number) => {
    setGuideIdsCity((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImageCity(event.target.files[0]);
    }
  };

  const isFormValid = () => {
    return (
      chooseCity &&
      (nameCity.en ||
        nameCity.ru ||
        countryCity.en ||
        countryCity.ru ||
        latCity ||
        lonCity ||
        imageCity) &&
      !validationErrors.name.en &&
      !validationErrors.name.ru &&
      !validationErrors.country.en &&
      !validationErrors.country.ru &&
      !validationErrors.lat &&
      !validationErrors.lon
    );
  };

  return (
    <FetchWrapper
      loading={cities.loading || sights.loading || guides.loading}
      error={cities.error || sights.error || guides.error}
    >
      {isClick ? (
        <FetchWrapper loading={city.loading} error={city.error}>
          <Typography variant="h6">
            {t("admin_page.update.city.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6">
            {t("admin_page.update.city.select_label")}
          </Typography>
          <NativeSelect
            value={chooseCity}
            onChange={(e) => selectCity(e.target.value)}
            fullWidth
          >
            {cities.cities?.map((item) => (
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
              {t("admin_page.update.city.name_label")} (English)
            </Typography>
            <TextField
              label={`${t("admin_page.update.city.name")} (English)`}
              type="text"
              value={nameCity.en}
              onChange={(e) => newNameCity(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.name.en}
              helperText={
                validationErrors.name.en && t(validationErrors.name.en)
              }
            />
            <Typography variant="h6" component="h2">
              {t("admin_page.update.city.country_label")} (English):
            </Typography>
            <TextField
              label={`${t("admin_page.update.city.country")} (English)`}
              type="text"
              value={countryCity.en}
              onChange={(e) => newCountryCity(e.target.value, "en")}
              fullWidth
              error={!!validationErrors.country.en}
              helperText={
                validationErrors.country.en && t(validationErrors.country.en)
              }
            />
          </Box>

          <Box hidden={currentTab !== 1}>
            <Typography variant="h6" component="h2">
              {t("admin_page.update.city.name_label")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.city.name")} (Русский)`}
              type="text"
              value={nameCity.ru}
              onChange={(e) => newNameCity(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.name.ru}
              helperText={
                validationErrors.name.ru && t(validationErrors.name.ru)
              }
            />
            <Typography variant="h6" component="h2">
              {t("admin_page.update.city.country_label")} (Русский):
            </Typography>
            <TextField
              label={`${t("admin_page.update.city.country")} (Русский)`}
              type="text"
              value={countryCity.ru}
              onChange={(e) => newCountryCity(e.target.value, "ru")}
              fullWidth
              error={!!validationErrors.country.ru}
              helperText={
                validationErrors.country.ru && t(validationErrors.country.ru)
              }
            />
          </Box>

          <Typography variant="h6" component="h2">
            {t("admin_page.update.city.lat_label")}:
          </Typography>
          <TextField
            label={t("admin_page.update.city.lat")}
            type="text"
            value={latCity}
            onChange={(e) => newLatCity(e.target.value)}
            fullWidth
            error={!!validationErrors.lat}
            helperText={validationErrors.lat && t(validationErrors.lat)}
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.update.city.lon_label")}:
          </Typography>
          <TextField
            label={t("admin_page.update.city.lon")}
            type="text"
            value={lonCity}
            onChange={(e) => newLonCity(e.target.value)}
            fullWidth
            error={!!validationErrors.lon}
            helperText={validationErrors.lon && t(validationErrors.lon)}
          />

          <Typography variant="h6" component="h2">
            {t("admin_page.update.city.image_label")}:
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
            {t("admin_page.update.city.sight_button")}
          </Button>
          {sightIdsCity.map((id, idx) => (
            <Box key={id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <NativeSelect
                value={id}
                onChange={(e) => selectSight(e.target.value, idx)}
                fullWidth
              >
                {sights.sights?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name[language] || s.name.en}
                  </option>
                ))}
              </NativeSelect>
              <CloseIcon
                onClick={() => deleteSightSelect(idx)}
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
            {t("admin_page.update.city.guide_button")}
          </Button>
          {guideIdsCity.map((id, idx) => (
            <Box key={id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <NativeSelect
                value={id}
                onChange={(e) => selectGuide(e.target.value, idx)}
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
                onClick={() => deleteGuideSelect(idx)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            fullWidth
            onClick={updateCity}
            disabled={!isFormValid()}
            sx={{ mt: 2 }}
          >
            {t("admin_page.update.city.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateCity;
