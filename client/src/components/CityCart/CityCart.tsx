import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CONTEXT } from "../../libs/constants";
import { getFindCities } from "../../libs/utils";
import { IListCitiesProps } from "../../types/types";
import ListCountryCities from "../ListCountryCities/ListCountryCities";
import styles from "./CityCart.module.scss";

function CityCart(props: IListCitiesProps) {
  const { cities } = props;
  const { nameCity } = useContext(CONTEXT);
  const navigate = useNavigate();

  const getCities = () => {
    return getFindCities(cities, nameCity);
  };

  const viewCity = (id: number) => {
    navigate(`/city/${id}`);
  };

  return (
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
  );
}

export default CityCart;
