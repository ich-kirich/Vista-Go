import { Box, Typography } from "@mui/material";
import { useEffect, useState, MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { CONTEXT } from "../../libs/constants";
import { getFindCities } from "../../libs/utils";
import recommend from "../../store/actionCreators/recommend";
import { ICities } from "../../types/types";
import ListCountryCities from "../ListCountryCities/ListCountryCities";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./CityCart.module.scss";

function CityCart() {
  const { nameCity } = useContext(CONTEXT);
  const { fetchCities } = useActions();
  const [country, setCountry] = useState<ICities[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchCities();
  }, []);
  const { cities, error, loading } = useTypedSelector((state) => state.cities);

  const getCities = () => {
    if (nameCity) {
      return getFindCities(cities, nameCity);
    }
    return country;
  };

  const viewCity = (id: number) => {
    navigate(`/city/${id}`);
  };
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
              {cities.slice(0, 3).map((item) => (
                <Box
                  key={item.id}
                  className={styles.counrty__img}
                  sx={{
                    backgroundImage: `url(${item.image})`,
                  }}
                  onClick={() => viewCity(item.id)}
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
              <ListCountryCities cities={getCities()} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CityCart;
