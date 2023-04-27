import { Box, IconButton } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames";
import { useRouter } from "next/router";
import styles from "./ControlPanel.module.scss";

function ControlPanel() {
  const router = useRouter();
  return (
    <Box className={styles.panel__wrapper}>
      <IconButton
        color="default"
        className={classNames(router.pathname === "/" && styles.icon_active)}
        onClick={() => {
          router.push("/");
        }}
      >
        <WidgetsIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          router.pathname === "/city" && styles.icon_active
        )}
      >
        <LocationOnIcon />
      </IconButton>
      <IconButton
        color="default"
        className={classNames(
          router.pathname === "/user" && styles.icon_active
        )}
      >
        <PersonIcon />
      </IconButton>
    </Box>
  );
}

export default ControlPanel;
