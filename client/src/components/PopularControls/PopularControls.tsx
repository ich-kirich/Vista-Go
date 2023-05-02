import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import styles from "./PopularControls.module.scss";
import ModalComponent from "../ModalComponent/ModalComponent";
import { IDetailsSightProps } from "../../types/types";
import DetailsSight from "../DetailsSight/DetailsSight";

function PopularControls(props: IDetailsSightProps) {
  const { sight } = props;
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    setVisible(true);
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
              onClick={changeVisible}
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
              onClick={changeVisible}
            >
              Navigation
            </Typography>
            <ArrowForwardIosIcon
              fontSize="small"
              className={styles.btn__icon}
            />
          </Button>
        </ButtonGroup>
        <ModalComponent visible={visible} setVisible={setVisible}>
          <DetailsSight sight={sight} />
        </ModalComponent>
      </Box>
    </Box>
  );
}

export default PopularControls;
