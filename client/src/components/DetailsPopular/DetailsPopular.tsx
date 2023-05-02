import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import styles from "./DetailsPopular.module.scss";

function DetailsPopular(props: ICityProps) {
  const { city } = props;
  return (
    <Box className={styles.details__wrapper}>
      <Box
        className={styles.details__img}
        sx={{
          backgroundImage: `url(${city.sights![0].image})`,
        }}
      />
      <Box className={styles.details__tags}>
        <Typography variant="h6" component="h5">
          Tags:
        </Typography>
        {city.sights![0].tags.map((item, index) => (
          <Typography
            key={item.id}
            variant="h6"
            component="h5"
            className={styles.details__tag}
          >
            {index === city.sights![0].tags.length - 1
              ? item.name
              : `${item.name},`}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography variant="h6" component="h5">
          Description:
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.details__text}
        >
          {city.sights![0].description}
        </Typography>
      </Box>
    </Box>
  );
}

export default DetailsPopular;
