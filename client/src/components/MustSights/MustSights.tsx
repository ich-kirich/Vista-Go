import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import styles from "./MustSights.module.scss";

function MustSights(props: ICityProps) {
  const { city } = props;
  return (
    <Box>
      {!city.sights || city.sights.length === 0 ? (
        <ViewError>No sights Found</ViewError>
      ) : (
        <Box className={styles.signts__wrapper}>
          <Box
            sx={{
              backgroundImage: `url(${city.sights[0].image})`,
            }}
            className={styles.sight__first}
          />
          <Box className={styles.wrapper}>
            {city.sights.length >= 2 && (
              <Box
                sx={{
                  backgroundImage: `url(${city.sights[1].image})`,
                }}
                className={styles.sight__second}
              />
            )}
            <Box className={styles.sight__wrapper}>
              {city.sights.length >= 3 && (
                <Box
                  sx={{
                    backgroundImage: `url(${city.sights[2].image})`,
                  }}
                  className={styles.sight__third}
                />
              )}
              {city.sights.length >= 4 && (
                <Box className={styles.sight__amount}>
                  <Typography
                    variant="h6"
                    component="h5"
                    className={styles.amount__text}
                  >
                    {city.sights.length}+
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MustSights;
