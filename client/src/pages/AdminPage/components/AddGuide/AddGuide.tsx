import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  NativeSelect,
} from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./AddGuide.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function AddGuide() {
  const [currentTab, setCurrentTab] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [userId, setUserId] = useState("");
  const [nameGuide, setNameGuide] = useState({ en: "", ru: "" });
  const [descriptionGuide, setDescriptionGuide] = useState({ en: "", ru: "" });
  const [contacts, setContacts] = useState("");
  const [cityIds, setCityIds] = useState<number[]>([]);
  const [sightIds, setSightIds] = useState<number[]>([]);
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationErrors, setValidationErrors] = useState({
    nameGuide_en: null as string | null,
    nameGuide_ru: null as string | null,
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchAllSights, fetchCities, fetchUsers, fetchCreateGuide } =
    useActions();
  const sights = useTypedSelector((state) => state.sights);
  const cities = useTypedSelector((state) => state.cities);
  const users = useTypedSelector((state) => state.users);
  const guide = useTypedSelector((state) => state.guide);

  useEffect(() => {
    fetchAllSights();
    fetchCities();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.users && users.users.length > 0) {
      setUserId(String(users.users[0].id));
    }
  }, [users]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const newNameGuide = (value: string, lang: "en" | "ru") => {
    const error = validateName(value);
    setValidationErrors((prev) => ({
      ...prev,
      [`nameGuide_${lang}`]: error,
    }));
    setNameGuide((prev) => ({ ...prev, [lang]: value }));
  };

  const newDescriptionGuide = (value: string, lang: "en" | "ru") => {
    setDescriptionGuide((prev) => ({ ...prev, [lang]: value }));
  };

  const newContactsGuide = (value: string) => {
    setContacts(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImageGuide(event.target.files[0]);
    }
  };

  const addCity = () => {
    const availableCity = cities.cities?.find(
      (city) => !cityIds.includes(city.id),
    );
    if (availableCity) {
      setCityIds((prev) => [...prev, availableCity.id]);
    }
  };

  const addSight = () => {
    const availableSight = sights.sights?.find(
      (sight) => !sightIds.includes(sight.id),
    );
    if (availableSight) {
      setSightIds((prev) => [...prev, availableSight.id]);
    }
  };

  const selectCity = (value: string, index: number) => {
    const updated = [...cityIds];
    updated[index] = Number(value);
    setCityIds(updated);
  };

  const deleteCitySelect = (index: number) => {
    setCityIds((prev) => prev.filter((_, i) => i !== index));
  };

  const selectSight = (value: string, index: number) => {
    const updated = [...sightIds];
    updated[index] = Number(value);
    setSightIds(updated);
  };

  const deleteSightSelect = (index: number) => {
    setSightIds((prev) => prev.filter((_, i) => i !== index));
  };

  const addGuide = () => {
    setIsClick(true);
    if (imageGuide) {
      fetchCreateGuide(
        nameGuide,
        descriptionGuide,
        contacts,
        cityIds,
        sightIds,
        imageGuide,
        Number(userId),
      );
    }
  };

  const isFormValid = () => {
    return (
      userId &&
      imageGuide &&
      nameGuide.en &&
      nameGuide.ru &&
      !validationErrors.nameGuide_en &&
      !validationErrors.nameGuide_ru
    );
  };

  return (
    <Box className={styles.controls__wrapper}>
      <FetchWrapper
        loading={
          users.loading || guide.loading || cities.loading || sights.loading
        }
        error={users.error || guide.error || cities.error || sights.error}
      >
        <>
          {isClick ? (
            <FetchWrapper loading={guide.loading} error={guide.error}>
              <Typography variant="h6" component="h5">
                {t("admin_page.add.guide.success")}
              </Typography>
            </FetchWrapper>
          ) : (
            <>
              <Typography variant="h6">
                {t("admin_page.add.guide.user_label")}:
              </Typography>
              <NativeSelect
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                variant="standard"
                fullWidth
              >
                {users.users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </NativeSelect>

              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="English" />
                <Tab label="Русский" />
              </Tabs>

              <Box hidden={currentTab !== 0}>
                <Typography variant="h6">
                  {t("admin_page.add.guide.name")} (English):
                </Typography>
                <TextField
                  label={`${t("admin_page.add.guide.name")} (English)`}
                  type="text"
                  value={nameGuide.en}
                  onChange={(e) => newNameGuide(e.target.value, "en")}
                  fullWidth
                  error={!!validationErrors.nameGuide_en}
                  helperText={
                    validationErrors.nameGuide_en &&
                    t(validationErrors.nameGuide_en)
                  }
                />
                <Typography variant="h6">
                  {t("admin_page.add.guide.description")} (English):
                </Typography>
                <TextField
                  label={`${t("admin_page.add.guide.description")} (English)`}
                  type="text"
                  value={descriptionGuide.en}
                  onChange={(e) => newDescriptionGuide(e.target.value, "en")}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Box>

              <Box hidden={currentTab !== 1}>
                <Typography variant="h6">
                  {t("admin_page.add.guide.name")} (Русский):
                </Typography>
                <TextField
                  label={`${t("admin_page.add.guide.name")} (Русский)`}
                  type="text"
                  value={nameGuide.ru}
                  onChange={(e) => newNameGuide(e.target.value, "ru")}
                  fullWidth
                  error={!!validationErrors.nameGuide_ru}
                  helperText={
                    validationErrors.nameGuide_ru &&
                    t(validationErrors.nameGuide_ru)
                  }
                />
                <Typography variant="h6">
                  {t("admin_page.add.guide.description")} (Русский):
                </Typography>
                <TextField
                  label={`${t("admin_page.add.guide.description")} (Русский)`}
                  type="text"
                  value={descriptionGuide.ru}
                  onChange={(e) => newDescriptionGuide(e.target.value, "ru")}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Box>

              <Typography variant="h6">
                {t("admin_page.add.guide.contacts")}:
              </Typography>
              <TextField
                label={t("admin_page.add.guide.contacts")}
                type="text"
                value={contacts}
                onChange={(e) => newContactsGuide(e.target.value)}
                fullWidth
              />

              <Typography variant="h6">
                {t("admin_page.add.guide.image_label")}:
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
                onClick={addCity}
                disabled={
                  !cities.cities?.some((city) => !cityIds.includes(city.id))
                }
              >
                {t("admin_page.add.guide.city_button")}
              </Button>

              {cityIds.map((cityId, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <NativeSelect
                    value={cityId}
                    onChange={(e) => selectCity(e.target.value, index)}
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
                    onClick={() => deleteCitySelect(index)}
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
                {t("admin_page.add.guide.sight_button")}
              </Button>

              {sightIds.map((sightId, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <NativeSelect
                    value={sightId}
                    onChange={(e) => selectSight(e.target.value, index)}
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
                    onClick={() => deleteSightSelect(index)}
                    sx={{ ml: 1, cursor: "pointer" }}
                  />
                </Box>
              ))}

              <Button
                variant="contained"
                fullWidth
                onClick={addGuide}
                disabled={!isFormValid()}
                sx={{ mt: 2 }}
              >
                {t("admin_page.add.guide")}
              </Button>
            </>
          )}
        </>
      </FetchWrapper>
    </Box>
  );
}

export default AddGuide;
