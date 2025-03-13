import { Box, Typography } from "@mui/material";
import { ISightProps } from "../../../../types/types";
import styles from "./PopularSight.module.scss";

function PopularSight({ sight }: ISightProps) {
  return (
    <Box className={styles.popular__wrapper}>
      <Box
        className={styles.popular__img}
        sx={{ backgroundImage: `url(${sight.image})` }}
      />

      <Box className={styles.sight__inf}>
        <Typography variant="h6" component="h5" className={styles.sight__name}>
          {sight.name}
        </Typography>

        <Box className={styles.sight__tags}>
          <Typography variant="h6" component="h5" className={styles.sight__tag}>
            {sight.tags.map((tag) => tag.name).join(", ")}
          </Typography>
        </Box>

        <Box className={styles.sight__distance}>
          <Typography
            variant="h6"
            component="h5"
            className={styles.sight__price}
          >
            {sight.price}
          </Typography>
          <Typography variant="h6" component="h5" className={styles.sight__tag}>
            {sight.distance}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PopularSight;
