import { Box, Typography } from "@mui/material";
import styles from "./CityGuides.module.scss";
import { useTranslation } from "react-i18next";
import { IGuide } from "../../../../types/types";
import { Routes } from "../../../../libs/enums";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../../../libs/utils";

function CityGuides(props: { guides: IGuide[] }) {
  const { guides } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const viewGuide = (id: number) => {
    navigate(getRoute(Routes.GUIDE, { id }));
  };

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
            onClick={() => viewGuide(item.id)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default CityGuides;
