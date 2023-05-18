import { Box, Typography } from "@mui/material";
import { ISightProps } from "../../types/types";
import styles from "./DetailsSight.module.scss";

function DetailsPopular(props: ISightProps) {
  const { sight } = props;
  return (
    <Box className={styles.details__wrapper}>
      <Box
        className={styles.details__img}
        sx={{
          backgroundImage: `url(${sight.image})`,
        }}
      />
      <Box className={styles.details__tags}>
        <Typography variant="h6" component="h5">
          Tags:
        </Typography>
        {sight.tags.map((item, index) => (
          <Typography
            key={item.id}
            variant="h6"
            component="h5"
            className={styles.details__tag}
          >
            {index === sight.tags.length - 1 ? item.name : `${item.name},`}
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
          {sight.description}
        </Typography>
      </Box>
    </Box>
  );
}

export default DetailsPopular;
