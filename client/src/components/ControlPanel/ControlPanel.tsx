import { Box, IconButton } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ControlPanel.module.scss";
import { Routes } from "../../libs/enums";

function ControlPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box className={styles.panel__wrapper}>
      <IconButton
        color="default"
        className={classNames(
          location.pathname === Routes.HOME && styles.icon_active,
        )}
        onClick={() => {
          navigate(Routes.HOME);
        }}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          location.pathname.includes("/city") && styles.icon_active,
        )}
        onClick={() => {
          navigate(Routes.MAP);
        }}
      >
        <LocationOnIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          location.pathname === Routes.CABINET && styles.icon_active,
        )}
        onClick={() => {
          navigate(Routes.CABINET);
        }}
      >
        <PersonIcon />
      </IconButton>
    </Box>
  );
}

export default ControlPanel;
