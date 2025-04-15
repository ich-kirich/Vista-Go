import {
  Box,
  Typography,
  TextField,
  Button,
  NativeSelect,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./AddCity.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateLat, validateLon, validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function AddCity() {
  const [isClick, setIsClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [countryCity, setCountryCity] = useState({
    en: "",
    ru: "",
  });
  const [nameCity, setNameCity] = useState({
    en: "",
    ru: "",
  });
  const [latCity, setLatCity] = useState("");
  const [lonCity, setLonCity] = useState("");
  const [sightIdsCity, setSightIdsCity] = useState<number[]>([]);
  const [numberSights, setNumberSights] = useState<number[]>([]);
  const [guideIdsCity, setGuideIdsCity] = useState<number[]>([]);
  const [numberGuides, setNumberGuides] = useState<number[]>([]);
  const [imageCity, setImageCity] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const { t } = useTranslation();

  const { fetchCreateCity, fetchAllSights, fetchGuides } = useActions();
  const { sights, error, loading } = useTypedSelector((state) => state.sights);
  const city = useTypedSelector((state) => state.city);
  const guides = useTypedSelector((state) => state.guides);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [`nameCity_${lang}`]: error,
    }));
    setNameCity((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const newCountryCity = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [`countryCity_${lang}`]: error,
    }));
    setCountryCity((prev) => ({
      ...prev,
      [lang]: value,
    }));
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

  const addCity = () => {
    setIsClick(true);
    fetchCreateCity({
      country: countryCity,
      name: nameCity,
      lat: latCity,
      lon: lonCity,
      sightIds: sightIdsCity,
      guideIds: guideIdsCity,
      image: imageCity!,
    });
  };

  // Остальные методы остаются без изменений
  const addSight = () => {
    setNumberSights([...numberSights, numberSights.length + 1]);
    fetchAllSights();
  };

  const addGuide = () => {
    setNumberGuides([...numberGuides, numberGuides.length + 1]);
    fetchGuides();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageCity(file);
  };

  const selectSight = (value: string) => {
    if (sightIdsCity.includes(Number(value))) {
      setSightIdsCity(sightIdsCity.filter((item) => item !== Number(value)));
    } else {
      setSightIdsCity([...sightIdsCity, Number(value)]);
    }
  };

  const selectGuide = (value: string) => {
    if (guideIdsCity.includes(Number(value))) {
      setGuideIdsCity(guideIdsCity.filter((item) => item !== Number(value)));
    } else {
      setGuideIdsCity([...guideIdsCity, Number(value)]);
    }
  };

  const deleteGuideSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (guideIdsCity.includes(Number(idBlock))) {
      setGuideIdsCity(guideIdsCity.filter((item) => item !== Number(idBlock)));
      setNumberGuides((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    } else {
      setGuideIdsCity([...guideIdsCity, Number(idBlock)]);
    }
  };

  const deleteSightsSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sightIdsCity.includes(Number(idBlock))) {
      setSightIdsCity(sightIdsCity.filter((item) => item !== Number(idBlock)));
      setNumberSights((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    } else {
      setSightIdsCity([...sightIdsCity, Number(idBlock)]);
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
      guideIdsCity.length > 0
    );
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={city.loading} error={city.error}>
          <Typography variant="h6" component="h5">
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

          <Typography variant="h6" component="h2">
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

          <Button variant="text" fullWidth onClick={addSight}>
            {t("admin_page.add.city.sight")}
          </Button>
          <FetchWrapper loading={loading} error={error}>
            {numberSights.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={sightIdsCity[elem - 1]}
                  onChange={(e) => selectSight(e.target.value)}
                  variant="standard"
                >
                  {sights &&
                    sights.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={sightIdsCity.includes(item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                </NativeSelect>
                <CloseIcon
                  className={styles.select__delete}
                  onClick={(e) => deleteSightsSelect(elem, e)}
                />
              </Box>
            ))}
          </FetchWrapper>

          <Button variant="text" fullWidth onClick={addGuide}>
            {t("admin_page.add.city.guide")}
          </Button>
          <FetchWrapper loading={guides.loading} error={guides.error}>
            {numberGuides.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={guideIdsCity[elem - 1]}
                  onChange={(e) => selectGuide(e.target.value)}
                  variant="standard"
                >
                  {guides.guides &&
                    guides.guides.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={guideIdsCity.includes(item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                </NativeSelect>
                <CloseIcon
                  className={styles.select__delete}
                  onClick={(e) => deleteGuideSelect(elem, e)}
                />
              </Box>
            ))}
          </FetchWrapper>

          <Button
            variant="contained"
            fullWidth
            onClick={addCity}
            disabled={!isFormValid()}
          >
            {t("admin_page.add.city")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddCity;
