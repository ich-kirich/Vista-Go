import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CONTEXT } from "../../libs/constants";
import { ICity, IListCountryCitiesProps } from "../../types/types";
import ModalComponent from "../ModalComponent/ModalComponent";
import styles from "./ListCountryCities.module.scss";

function ListCountryCities(props: IListCountryCitiesProps) {
  const { cities, setCountry } = props;
  const { visible, setVisible } = useContext(CONTEXT);
  const navigate = useNavigate();
  const viewCity = (city: ICity) => {
    localStorage.setItem("city", JSON.stringify(city));
    navigate("/city");
  };
  return (
    <ModalComponent
      visible={visible}
      setVisible={setVisible}
      setCountry={setCountry}
    >
      <Box>
        <Typography variant="h6" component="h5">
          {cities.length === 0 ? "No city found" : "Choose city:"}
        </Typography>
        {cities.map((item) => (
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
