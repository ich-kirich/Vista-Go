import { Box, Typography } from "@mui/material";
import { IDetailsSightProps } from "../../types/types";
import styles from "./PopularSight.module.scss";

function PopularSight(props: IDetailsSightProps) {
  const { sight } = props;
  return (
    <Box className={styles.popular__wrapper}>
      <Box
        className={styles.popular__img}
        sx={{
          backgroundImage: `url(${sight.image})`,
        }}
      />
      <Box className={styles.sight__inf}>
        <Typography variant="h6" component="h5" className={styles.sight__name}>
          {sight.name}
        </Typography>
        <Box className={styles.sight__tags}>
          {sight.tags.map((item, index) => (
            <Typography
              key={item.id}
              variant="h6"
              component="h5"
              className={styles.sight__tag}
            >
              {index === sight.tags.length - 1 ? item.name : `${item.name},`}
            </Typography>
          ))}
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
