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
import styles from "./CityPage.module.scss";

function CityPage() {
  const { fetchCity } = useActions();
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchCity(id);
  }, [id]);
  const { city, error, loading } = useTypedSelector((state) => state.city);

  return (
    <FetchWrapper loading={loading} error={error}>
      {city && (
        <Container maxWidth="sm" className={styles.app__wrapper}>
          <CityPanel city={city} />
          <Box>
            {city.sights.length > 0 ? (
              <CityPopular sight={city.sights[0]} />
            ) : (
              <ViewError>No sights Found</ViewError>
            )}
          </Box>
          <MustGo />
        </Container>
      )}
    </FetchWrapper>
  );
}

export default CityPage;
