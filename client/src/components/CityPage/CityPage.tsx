import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import CityPanel from "../CityPanel/CityPanel";
import CityPopular from "../CityPopular/CityPopular";
import FetchWrapper from "../FetchWrapper/FetchWrapper";
import Loader from "../Loader/Loader";
import MustGo from "../MustGo/MustGo";
import ViewError from "../ViewError/ViewError";
import styles from "./CityPage.module.scss";

function CityPage() {
  const { fetchCity } = useActions();
  const { id } = useParams();

  useEffect(() => {
    fetchCity(id!);
  }, []);
  const { city, error, loading } = useTypedSelector((state) => state.city);

  return (
    <FetchWrapper loading={loading} error={error}>
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
    </FetchWrapper>
  );
}

export default CityPage;
