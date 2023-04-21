import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import PopularSight from "../PopularSight/PopularSight";
import styles from "./CityPopular.module.scss";

function CityPopular(props: ICityProps) {
  const { city } = props;
  return (
    <Box className={styles.popular__wrapper}>
      <Box className={styles.city__wrapper}>
        <Typography variant="h6" component="h5" className={styles.title}>
          Popular
        </Typography>
        <Typography variant="h6" component="h5" className={styles.more}>
          More
        </Typography>
      </Box>
      <PopularSight city={city} />
    </Box>
  );
}

export default CityPopular;
