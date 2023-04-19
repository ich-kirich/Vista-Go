import { Box, Typography } from "@mui/material";
import CityCart from "../CityCart/CityCart";
import styles from "./CitiesBlock.module.scss";

function CitiesBlock() {
  return (
    <Box>
      <Box className={styles.wrapper__header}>
        <Box className={styles.wrapper__title}>
          <Typography variant="h6" component="h2" className={styles.title}>
            City
          </Typography>
          <Box className={styles.hot}>Hot</Box>
        </Box>
        <Typography variant="h6" component="h5" className={styles.more}>
          More
        </Typography>
      </Box>
      <CityCart />
    </Box>
  );
}

export default CitiesBlock;
