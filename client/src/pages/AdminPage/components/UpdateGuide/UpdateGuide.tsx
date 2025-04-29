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
  const [numberCities, setNumberCities] = useState<number[]>([]);
  const [numberSights, setNumberSights] = useState<number[]>([]);
  const [imageGuide, setImageGuide] = useState<File>();
  const [isClick, setIsClick] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    nameGuide_en: string | null;
    nameGuide_ru: string | null;
  }>({
    nameGuide_en: null,
    nameGuide_ru: null,
  });
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchGuides, fetchAllSights, fetchCities, fetchUpdateGuide } =
    useActions();
  const guide = useTypedSelector((state) => state.guide);
  const sights = useTypedSelector((state) => state.sights);
  const cities = useTypedSelector((state) => state.cities);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  useEffect(() => {
    fetchGuides();
    fetchAllSights();
    fetchCities();
  }, [guide.loading]);

  useEffect(() => {
    if (guides && guides.length > 0) {
      const firstGuide = guides[0];
      setChooseGuide(String(firstGuide.id));
      setNameGuide(firstGuide.name);
      setDescriptionGuide(firstGuide.description);
      setContacts(firstGuide.contacts);
      const updatedCitiesIds = firstGuide.cities.map((item) => item.id);
      setCityIds(updatedCitiesIds);
      setNumberCities(
        Array.from({ length: updatedCitiesIds.length }, (_, i) => i + 1),
      );
      const updatedSightIds = firstGuide.sights.map((item) => item.id);
      setSightIds(updatedSightIds);
      setNumberSights(
        Array.from({ length: updatedSightIds.length }, (_, i) => i + 1),
      );
    }
  }, [guides]);

  useEffect(() => {
    const selectedGuide = guides?.find((g) => g.id === Number(chooseGuide));
    if (selectedGuide) {
      setNameGuide(selectedGuide.name);
      setDescriptionGuide(selectedGuide.description);
      setContacts(selectedGuide.contacts);
      const updatedCitiesIds = selectedGuide.cities.map((item) => item.id);
      setCityIds(updatedCitiesIds);
      setNumberCities(
        Array.from({ length: updatedCitiesIds.length }, (_, i) => i + 1),
      );
      const updatedSightIds = selectedGuide.sights.map((item) => item.id);
      setSightIds(updatedSightIds);
      setNumberSights(
        Array.from({ length: updatedSightIds.length }, (_, i) => i + 1),
      );
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
    setValidationErrors((prev) => ({
      ...prev,
      [`nameGuide_${lang}`]: error,
    }));
    setNameGuide((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const newDescriptionGuide = (value: string, lang: "en" | "ru") => {
    setDescriptionGuide((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const newContactsGuide = (value: string) => {
    setContacts(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      setImageGuide(file);
    }
  };

  const addCity = () => {
    setNumberCities([...numberCities, numberCities.length + 1]);
  };

  const addSight = () => {
    setNumberSights([...numberSights, numberSights.length + 1]);
  };

  const selectCity = (value: string, idBlock: number) => {
    setCityIds((prev) => {
      const updated = [...prev];
      updated[idBlock - 1] = Number(value);
      return updated;
    });
  };

  const selectSight = (value: string, idBlock: number) => {
    setSightIds((prev) => {
      const updated = [...prev];
      updated[idBlock - 1] = Number(value);
      return updated;
    });
  };

  const deleteCitySelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCityIds((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
    setNumberCities((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
  };

  const deleteSightSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSightIds((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
    setNumberSights((prev) => prev.filter((_, idx) => idx !== idBlock - 1));
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
          <Typography variant="h6" component="h2">
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
              {t("admin_page.update.guide.name")} (English):
            </Typography>
            <TextField
              value={nameGuide.en}
              onChange={(e) => newNameGuide(e.target.value, "en")}
              fullWidth
            />
            <Typography variant="h6">
              {t("admin_page.update.guide.description")} (English):
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
              {t("admin_page.update.guide.name")} (Русский):
            </Typography>
            <TextField
              value={nameGuide.ru}
              onChange={(e) => newNameGuide(e.target.value, "ru")}
              fullWidth
            />
            <Typography variant="h6">
              {t("admin_page.update.guide.description")} (Русский):
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

          <Button variant="text" fullWidth onClick={addCity}>
            {t("admin_page.update.guide.add_city")}
          </Button>

          {numberCities.map((elem) => (
            <Box
              key={elem}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={cityIds[elem - 1] || ""}
                onChange={(e) => selectCity(e.target.value, elem)}
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
                onClick={(e) => deleteCitySelect(elem, e)}
                sx={{ ml: 1, cursor: "pointer" }}
              />
            </Box>
          ))}

          <Button variant="text" fullWidth onClick={addSight}>
            {t("admin_page.update.guide.add_sight")}
          </Button>

          {numberSights.map((elem) => (
            <Box
              key={elem}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <NativeSelect
                value={sightIds[elem - 1] || ""}
                onChange={(e) => selectSight(e.target.value, elem)}
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
                onClick={(e) => deleteSightSelect(elem, e)}
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
