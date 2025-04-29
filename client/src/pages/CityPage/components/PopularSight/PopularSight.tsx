import { Box, Typography } from "@mui/material";
import { ISightProps } from "../../../../types/types";
import styles from "./PopularSight.module.scss";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function PopularSight({ sight }: ISightProps) {
  const { i18n } = useTranslation();
  const language = i18n.language as Locales;

  return (
    <Box className={styles.popular__wrapper}>
      <Box
        className={styles.popular__img}
        sx={{ backgroundImage: `url(${sight.image})` }}
      />

      <Box className={styles.sight__inf}>
        <Typography variant="h6" component="h5" className={styles.sight__name}>
          {sight.name[language] || sight.name.en}
        </Typography>

        <Box className={styles.sight__tags}>
          <Typography variant="h6" component="h5" className={styles.sight__tag}>
            {sight.tags
              .map((tag) => tag.name[language] || tag.name.en)
              .join(", ")}
          </Typography>
        </Box>

        <Box className={styles.guide__wrapper}>
          {sight.guides &&
            sight.guides.map((item) => (
              <Box
                key={item.id}
                className={styles.guide__img}
                sx={{
                  backgroundImage: `url(${item.image})`,
                }}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
}

export default PopularSight;
