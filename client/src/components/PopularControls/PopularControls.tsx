import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./PopularControls.module.scss";

function PopularControls() {
  return (
    <Box className={styles.btns__wrapper}>
      <Box className={styles.btns}>
        <ButtonGroup variant="text" aria-label="text button group">
          <Button className={styles.btn}>
            <Typography
              variant="h6"
              component="h5"
              className={styles.btn__text}
            >
              Details
            </Typography>
            <ArrowForwardIosIcon
              fontSize="small"
              className={styles.btn__icon}
            />
          </Button>
          <Button className={styles.btn}>
            <Typography
              variant="h6"
              component="h5"
              className={styles.btn__text}
            >
              Navigation
            </Typography>
            <ArrowForwardIosIcon
              fontSize="small"
              className={styles.btn__icon}
            />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default PopularControls;
