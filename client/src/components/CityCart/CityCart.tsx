import { Box, Typography } from "@mui/material";
import { useEffect, useState, MouseEvent, useContext } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { CONTEXT } from "../../libs/constants";
import { getAllCities } from "../../libs/utils";
import { ICity } from "../../types/types";
import ListCountryCities from "../ListCountryCities/ListCountryCities";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./CityCart.module.scss";

function CityCart() {
  const { nameCity, setVisible, setNameCity } = useContext(CONTEXT);
  const { fetchCity } = useActions();
  const [country, setCountry] = useState<ICity[]>([]);
  useEffect(() => {
    fetchCity();
  }, []);
  const { countries, error, loading } = useTypedSelector((state) => state.city);

  const viewListCities = (e: MouseEvent, cities: ICity[]) => {
    e.stopPropagation();
    setCountry(cities);
    setVisible(true);
    setNameCity("");
  };

  const getCities = () => {
    if (nameCity) {
      return getAllCities(countries, nameCity);
    }
    return country;
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
              {countries.map((item) => (
                <Box
                  key={item.id}
                  className={styles.counrty__img}
                  sx={{
                    backgroundImage: `url(${item.cities[0].sights[0].image})`,
                  }}
                  onClick={(e) => viewListCities(e, item.cities)}
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
              <ListCountryCities cities={getCities()} setCountry={setCountry} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CityCart;
