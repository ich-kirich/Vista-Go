import { Box, IconButton } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./ControlPanel.module.scss";

function ControlPanel() {
  return (
    <Box className={styles.panel__wrapper}>
      <IconButton color="default" className={styles.icon_active}>
        <WidgetsIcon />
      </IconButton>
      <IconButton color="default">
        <LocationOnIcon />
      </IconButton>
      <IconButton color="default">
        <PersonIcon />
      </IconButton>
    </Box>
  );
}

export default ControlPanel;
