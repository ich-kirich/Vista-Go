import { Box, Typography } from "@mui/material";
import { ISightProps } from "../../../../types/types";
import styles from "./DetailsSight.module.scss";

function DetailsPopular({ sight }: ISightProps) {
  return (
    <Box className={styles.details__wrapper}>
      <Box
        className={styles.details__img}
        sx={{
          backgroundImage: `url(${sight.image})`,
        }}
      />
      {sight.tags && (
        <Box className={styles.details__tags}>
          <Typography variant="h6" component="h5">
            Tags:
          </Typography>
          <Typography
            variant="h6"
            component="h5"
            className={styles.details__tag}
          >
            {sight.tags.map((tag) => tag.name).join(", ")}
          </Typography>
        </Box>
      )}
      {sight.description && (
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
      )}
    </Box>
  );
}

export default DetailsPopular;
