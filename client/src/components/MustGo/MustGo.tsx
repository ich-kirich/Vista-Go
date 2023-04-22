import { Box, Typography } from "@mui/material";
import { ICityProps } from "../../types/types";
import MustSights from "../MustSights/MustSights";
import styles from "./MustGo.module.scss";

function MustGo(props: ICityProps) {
  const { city } = props;
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
      <MustSights city={city} />
    </Box>
  );
}

export default MustGo;
