import { Box, IconButton, Typography } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import styles from "./CityPanel.module.scss";
import { ICities } from "../../../../types/types";

interface ICityProps {
  city: ICities;
}

function CityPanel({ city }: ICityProps) {
  return (
    <Box className={styles.city__wrapper}>
      <Typography variant="h6" component="h5" className={styles.city__name}>
        I'am in {city.name}
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
