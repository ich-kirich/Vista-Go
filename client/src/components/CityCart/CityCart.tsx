import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./CityCart.module.scss";

function CityCart() {
  const { fetchCity } = useActions();
  useEffect(() => {
    fetchCity();
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
            <Box className={styles.country__wrapper}>
              {city.map((item) => (
                <Box
                  key={item.id}
                  className={styles.counrty__img}
                  sx={{
                    backgroundImage: `url(${item.cities[0].sights[0].image})`,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h5"
                    className={styles.coutry__name}
                  >
                    {item.country}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CityCart;
