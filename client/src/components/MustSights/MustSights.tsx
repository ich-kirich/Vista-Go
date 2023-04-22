import { Box } from "@mui/material";
import classNames from "classnames";
import styles from "./MustSights.module.scss";

function MustSights() {
  return (
    <Box className={styles.signts__wrapper}>
      <Box
        sx={{
          backgroundImage: `url("https://cdn.dribbble.com/users/1523430/screenshots/5270259/travel_app.png")`,
        }}
        className={styles.sight__first}
      />
      <Box className={styles.wrapper}>
        <Box
          sx={{
            backgroundImage: `url("https://cdn.dribbble.com/users/1523430/screenshots/5270259/travel_app.png")`,
          }}
          className={styles.sight__second}
        />
        <Box className={styles.sight__wrapper}>
          <Box
            sx={{
              backgroundImage: `url("https://cdn.dribbble.com/users/1523430/screenshots/5270259/travel_app.png")`,
            }}
            className={styles.sight__third}
          />
          <Box
            sx={{
              backgroundImage: `url("https://cdn.dribbble.com/users/1523430/screenshots/5270259/travel_app.png")`,
            }}
            className={styles.sight__third}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default MustSights;
