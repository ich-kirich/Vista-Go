import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ICityProps } from "../../types/types";
import ModalComponent from "../ModalComponent/ModalComponent";
import PopularControls from "../PopularControls/PopularControls";
import PopularSight from "../PopularSight/PopularSight";
import PopupSights from "../PopupSights/PopupSights";
import ViewError from "../ViewError/ViewError";
import styles from "./CityPopular.module.scss";

function CityPopular(props: ICityProps) {
  const { city } = props;
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    setVisible(true);
  };

  return (
    <Box>
      {!city.sights || city.sights.length === 0 ? (
        <ViewError>No sights Found</ViewError>
      ) : (
        <Box className={styles.popular__wrapper}>
          <Box className={styles.city__wrapper}>
            <Typography variant="h6" component="h5" className={styles.title}>
              Popular
            </Typography>
            <Typography
              variant="h6"
              component="h5"
              className={styles.more}
              onClick={changeVisible}
            >
              More
            </Typography>
          </Box>
          <PopularSight sight={city.sights[0]} />
          <PopularControls sight={city.sights[0]} />
          <ModalComponent visible={visible} setVisible={setVisible}>
            <PopupSights city={city} />
          </ModalComponent>
        </Box>
      )}
    </Box>
  );
}

export default CityPopular;
