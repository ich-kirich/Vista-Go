import { Box, IconButton, Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { useTranslation } from "react-i18next";
import styles from "./CityPanel.module.scss";
import { ICities } from "../../../../types/types";

interface ICityProps {
  city: ICities;
}

function CityPanel({ city }: ICityProps) {
  const { t } = useTranslation();

  return (
    <Box className={styles.city__wrapper}>
      <Typography variant="h6" component="h5" className={styles.city__name}>
        {t("city_panel.in_city")} {city.name}
      </Typography>
      <Box className={styles.weather__wrapper}>
        <IconButton color="warning">
          <ThermostatIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="h5"
          className={styles.city__weather}
        >
          {city.weather}°
        </Typography>
      </Box>
    </Box>
  );
}

export default CityPanel;
