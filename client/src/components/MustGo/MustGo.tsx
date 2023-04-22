import { Box, Typography } from "@mui/material";
import MustSights from "../MustSights/MustSights";
import styles from "./MustGo.module.scss";

function MustGo() {
  return (
    <Box className={styles.go__wrapper}>
      <Box className={styles.must__wrapper}>
        <Typography variant="h6" component="h5" className={styles.title}>
          Must go
        </Typography>
        <Typography variant="h6" component="h5" className={styles.more}>
          More
        </Typography>
      </Box>
      <MustSights />
    </Box>
  );
}

export default MustGo;
