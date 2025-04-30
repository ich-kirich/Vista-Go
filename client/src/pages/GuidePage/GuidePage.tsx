import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GuidePage.module.scss";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import FetchWrapper from "../../components/FetchWrapper/FetchWrapper";
import { Locales, Routes } from "../../libs/enums";
import { useTranslation } from "react-i18next";
import { getRoute } from "../../libs/utils";

function GuidePage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;
  const navigate = useNavigate();

  const { fetchGuide } = useActions();
  useEffect(() => {
    if (id) fetchGuide(Number(id));
  }, [id]);
  const { guide, error, loading } = useTypedSelector((state) => state.guide);

  const viewCity = (id: number) => {
    navigate(getRoute(Routes.CITY, { id }));
  };

  const viewSight = (id: number, sightId: number) => {
    navigate(getRoute(Routes.SIGHT_DETAILS, { id, sightId }));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {guide && (
        <>
          <Box className={styles.guide__wrapper}>
            <Box className={styles.guide__information}>
              <Box
                className={styles.guide__img}
                sx={{ backgroundImage: `url(${guide.image})` }}
              />
              <Box className={styles.guide__info}>
                <Typography variant="h6">
                  {t("guide_page.name")} {guide.name[language]}
                </Typography>
                <Typography variant="h6">
                  {t("guide_page.contacts")} {guide.contacts}
                </Typography>
                <Typography variant="h6">
                  {t("guide_page.description")} {guide.description[language]}
                </Typography>
              </Box>
            </Box>

            <Box className={styles.guide__header}>
              <Typography variant="h5">{t("guide_page.cities")}</Typography>
              <Box className={styles.guide__cities}>
                {guide.cities?.map(
                  (city: {
                    id: number;
                    name: {
                      en: string;
                      ru: string;
                    };
                    image: string;
                  }) => (
                    <Box
                      key={city.id}
                      className={styles.city__tile}
                      sx={{
                        backgroundImage: `url(${city.image})`,
                      }}
                      onClick={() => viewCity(city.id)}
                    >
                      <Typography variant="h6" className={styles.tile__name}>
                        {city.name[language]}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>
            </Box>

            <Box className={styles.guide__header}>
              <Typography variant="h5">{t("guide_page.sights")}</Typography>
              <Box className={styles.guide__sights}>
                {guide.sights?.map(
                  (sight: {
                    id: number;
                    name: {
                      en: string;
                      ru: string;
                    };
                    image: string;
                    CityId: number;
                  }) => (
                    <Box
                      key={sight.id}
                      className={styles.sight__tile}
                      sx={{
                        backgroundImage: `url(${sight.image})`,
                      }}
                      onClick={() => viewSight(sight.CityId, sight.id)}
                    >
                      <Typography variant="h6" className={styles.tile__name}>
                        {sight.name[language]}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </FetchWrapper>
  );
}

export default GuidePage;
