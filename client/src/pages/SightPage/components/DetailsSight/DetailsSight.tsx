import { Box, Typography } from "@mui/material";
import { ISightProps } from "../../../../types/types";
import { useTranslation } from "react-i18next";
import styles from "./DetailsSight.module.scss";
import { Locales } from "../../../../libs/enums";

function DetailsPopular({ sight }: ISightProps) {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

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
            {t("details_sight.tags")}
          </Typography>
          <Typography
            variant="h6"
            component="h5"
            className={styles.details__tag}
          >
            {sight.tags
              .map((tag) => tag.name[language] || tag.name.en)
              .join(", ")}
          </Typography>
        </Box>
      )}
      {sight.description && (
        <Box>
          <Typography variant="h6" component="h5">
            {t("details_sight.description")}
          </Typography>
          <Typography
            variant="h6"
            component="h5"
            className={styles.details__text}
          >
            {sight.description[language] || sight.description.en}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DetailsPopular;
