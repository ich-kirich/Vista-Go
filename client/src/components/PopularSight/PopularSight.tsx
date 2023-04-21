import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import styles from "./PopularSight.module.scss";

function PopularSight(props: ICityProps) {
  const { city } = props;
  return (
    <Box className={styles.popular__wrapper}>
      <Box
        className={styles.popular__img}
        sx={{
          backgroundImage: `url(${city.sights[0].image})`,
        }}
      />
      <Box className={styles.sight__inf}>
        <Typography variant="h6" component="h5" className={styles.sight__name}>
          {city.sights[0].name}
        </Typography>
        <Box>
          <Typography variant="h6" component="h5" className={styles.sight__tag}>
            {city.sights[0].tags[0]}, {city.sights[0].tags[1]},{" "}
            {city.sights[0].tags[2]}
          </Typography>
        </Box>
        <Box className={styles.sight__distance}>
          <Typography
            variant="h6"
            component="h5"
            className={styles.sight__price}
          >
            $5
          </Typography>
          <Typography variant="h6" component="h5" className={styles.sight__tag}>
            6.2 km
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PopularSight;
