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
  const [numberCities, setNumberCities] = useState<number[]>([]);
  const [numberSights, setNumberSights] = useState<number[]>([]);
  const [imageGuide, setImageGuide] = useState<File>();
  const [validationErrors, setValidationErrors] = useState({
    nameGuide_en: null as string | null,
    nameGuide_ru: null as string | null,
  });

  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchAllSights, fetchCities, fetchUsers, fetchCreateGuide } =
    useActions();
  const sights = useTypedSelector((state) => state.sights.sights);
  const cities = useTypedSelector((state) => state.cities.cities);
  const { users, error, loading } = useTypedSelector((state) => state.users);
  const guide = useTypedSelector((state) => state.guide);

  useEffect(() => {
    fetchAllSights();
    fetchCities();
    if (!users) fetchUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      setUserId(String(users[0].id));
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImageGuide(event.target.files[0]);
    }
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
      <FetchWrapper loading={loading} error={error}>
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
                {users?.map((user) => (
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

              <Button variant="text" fullWidth onClick={addCity}>
                {t("admin_page.add.guide.city_button")}
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
                    {cities?.map((city) => (
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
                {t("admin_page.add.guide.sight_button")}
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
                    {sights?.map((sight) => (
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
