import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import CityPanel from "../CityPanel/CityPanel";
import CityPopular from "../CityPopular/CityPopular";
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
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Container maxWidth="sm" className={styles.app__wrapper}>
              <CityPanel city={city} />
              <CityPopular city={city} />
              <MustGo city={city} />
            </Container>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CityPage;
