import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import styles from "./PopularSight.module.scss";

function PopularSight(props: ICityProps) {
  const { city } = props;
  return (
    <Box>
      {!city.sights || city.sights.length === 0 ? (
        <ViewError>No sights Found</ViewError>
      ) : (
        <Box className={styles.popular__wrapper}>
          <Box
            className={styles.popular__img}
            sx={{
              backgroundImage: `url(${city.sights[0].image})`,
            }}
          />
          <Box className={styles.sight__inf}>
            <Typography
              variant="h6"
              component="h5"
              className={styles.sight__name}
            >
              {city.sights[0].name}
            </Typography>
            <Box className={styles.sight__tags}>
              {city.sights[0].tags.map((item, index) => (
                <Typography
                  key={item.id}
                  variant="h6"
                  component="h5"
                  className={styles.sight__tag}
                >
                  {index === city.sights![0].tags.length - 1
                    ? item.name
                    : `${item.name},`}
                </Typography>
              ))}
            </Box>
            <Box className={styles.sight__distance}>
              <Typography
                variant="h6"
                component="h5"
                className={styles.sight__price}
              >
                $5
              </Typography>
              <Typography
                variant="h6"
                component="h5"
                className={styles.sight__tag}
              >
                6.2 km
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PopularSight;
