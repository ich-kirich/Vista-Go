import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CONTEXT } from "../../../../libs/constants";
import { ICities, IListCitiesProps } from "../../../../types/types";
import ModalComponent from "../ModalComponent/ModalComponent";
import styles from "./ListCountryCities.module.scss";

function ListCountryCities(props: IListCitiesProps) {
  const { cities } = props;
  const sortCities = cities
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  const { visible, setVisible } = useContext(CONTEXT);
  const navigate = useNavigate();
  const viewCity = (city: ICities) => {
    navigate(`/city/${city.id}`);
  };

  return (
    <ModalComponent visible={visible} setVisible={setVisible}>
      <Box>
        <Typography variant="h6" component="h5">
          {sortCities.length === 0 ? "No city found" : "Choose city:"}
        </Typography>
        {sortCities.map((item) => (
          <Typography
            key={item.id}
            variant="inherit"
            component="p"
            className={styles.city}
            onClick={() => viewCity(item)}
          >
            {item.name}
          </Typography>
        ))}
      </Box>
    </ModalComponent>
  );
}

export default ListCountryCities;
