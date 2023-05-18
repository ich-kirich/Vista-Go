import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PopularControls.module.scss";
import { ISightProps } from "../../types/types";

function PopularControls(props: ISightProps) {
  const { sight } = props;
  const { id } = useParams();

  const navigate = useNavigate();
  const closePage = () => {
    navigate(`/city/${id}/sights/${sight.id}`);
  };

  return (
    <Box className={styles.btns__wrapper}>
      <Box className={styles.btns}>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          className={styles.bnts__group}
        >
          <Button className={styles.btn}>
            <Typography
              variant="h6"
              component="h5"
              className={styles.btn__text}
              onClick={closePage}
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
              onClick={closePage}
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
