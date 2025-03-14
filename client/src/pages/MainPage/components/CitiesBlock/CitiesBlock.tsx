import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import CityCart from "../CityCart/CityCart";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import ModalComponent from "../ModalComponent/ModalComponent";
import PopupList from "../PopupList/PopupList";
import styles from "./CitiesBlock.module.scss";

function CitiesBlock() {
  const [visible, setVisible] = useState(false);

  const { fetchCities } = useActions();
  useEffect(() => {
    fetchCities();
  }, []);
  const { cities, error, loading } = useTypedSelector((state) => state.cities);

  const changeVisible = () => {
    setVisible(true);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {cities && (
        <>
          <ModalComponent visible={visible} setVisible={setVisible}>
            <PopupList cities={cities} />
          </ModalComponent>
          <Box className={styles.header__wrapper}>
            <Box className={styles.title__wrapper}>
              <Typography variant="h6" component="h2" className={styles.title}>
                City
              </Typography>
              <Box className={styles.hot}>Hot</Box>
            </Box>
            <Typography
              variant="h6"
              component="h5"
              className={styles.more}
              onClick={changeVisible}
            >
              More
            </Typography>
          </Box>
          <CityCart cities={cities} />
        </>
      )}
    </FetchWrapper>
  );
}

export default CitiesBlock;
