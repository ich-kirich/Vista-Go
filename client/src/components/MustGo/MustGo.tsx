import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ICityProps } from "../../types/types";
import ModalComponent from "../ModalComponent/ModalComponent";
import MustSights from "../MustSights/MustSights";
import ListSights from "../ListSights/ListSights";
import styles from "./MustGo.module.scss";

function MustGo(props: ICityProps) {
  const { city } = props;
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    setVisible(true);
  };

  return (
    <Box className={styles.go__wrapper}>
      <Box className={styles.must__wrapper}>
        <Typography variant="h6" component="h5" className={styles.title}>
          Must go
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.more}
          onClick={changeVisible}
        >
          More
        </Typography>
      </Box>
      <MustSights city={city} />
      <ModalComponent visible={visible} setVisible={setVisible}>
        <ListSights city={city} />
      </ModalComponent>
    </Box>
  );
}

export default MustGo;
