import { Box, Typography } from "@mui/material";
import styles from "./CityGuides.module.scss";
import { useTranslation } from "react-i18next";
import { IGuide } from "../../../../types/types";

function CityGuides(props: { guides: IGuide[] }) {
  const { guides } = props;
  const { t } = useTranslation();

  return (
    <Box className={styles.guides__wrapper}>
      <Typography variant="h6" component="h5" className={styles.title}>
        {t("city_guides.guides")}
      </Typography>
      <Box className={styles.guide__wrapper}>
        {guides.map((item) => (
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
  );
}

export default CityGuides;
