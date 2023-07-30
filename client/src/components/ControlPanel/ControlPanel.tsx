import { Box, IconButton } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ControlPanel.module.scss";

function ControlPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box className={styles.panel__wrapper}>
      <IconButton
        color="default"
        className={classNames(
          location.pathname === "/home" && styles.icon_active,
        )}
        onClick={() => {
          navigate("/home");
        }}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          location.pathname.includes("/city") && styles.icon_active,
        )}
      >
        <LocationOnIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          location.pathname === "/cabinet" && styles.icon_active,
        )}
        onClick={() => {
          navigate("/cabinet");
        }}
      >
        <PersonIcon />
      </IconButton>
    </Box>
  );
}

export default ControlPanel;
