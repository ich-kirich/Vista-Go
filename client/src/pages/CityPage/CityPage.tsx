import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import CityPanel from "./components/CityPanel/CityPanel";
import CityPopular from "./components/CityPopular/CityPopular";
import FetchWrapper from "../../components/FetchWrapper/FetchWrapper";
import MustGo from "./components/MustGo/MustGo";
import ViewError from "../../components/ViewError/ViewError";
import { useTranslation } from "react-i18next";
import styles from "./CityPage.module.scss";
import CityGuides from "./components/CityGuides/CityGuides";

function CityPage() {
  const { fetchCity } = useActions();
  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) fetchCity(id);
  }, [id]);
  const { city, error, loading } = useTypedSelector((state) => state.city);

  return (
    <FetchWrapper loading={loading} error={error}>
      {city && (
        <Container maxWidth="lg" className={styles.app__wrapper}>
          <CityPanel city={city} />
          <Box>
            {city.sights.length > 0 ? (
              <CityPopular sight={city.sights[0]} />
            ) : (
              <ViewError>{t("city_page.no_sights_found")}</ViewError>
            )}
          </Box>
          <MustGo />
          {city.guides && <CityGuides guides={city.guides} />}
        </Container>
      )}
    </FetchWrapper>
  );
}

export default CityPage;
