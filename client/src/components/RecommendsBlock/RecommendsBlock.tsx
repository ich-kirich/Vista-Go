import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ModalComponent from "../ModalComponent/ModalComponent";
import RecommendsCart from "../RecommendsCart/RecommendsCart";
import PopupList from "../PopupList/PopupList";
import ViewError from "../ViewError/ViewError";
import styles from "./RecommendsBlock.module.scss";
import FetchWrapper from "../FetchWrapper/FetchWrapper";

function RecommendsBlock() {
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    setVisible(true);
  };

  const { fetchRecommends } = useActions();
  useEffect(() => {
    fetchRecommends();
  }, []);
  const { recommends, error, loading } = useTypedSelector(
    (state) => state.recommends,
  );

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.header__wrapper}>
        <Box className={styles.title__wrapper}>
          <Typography variant="h6" component="h2" className={styles.title}>
            Daily Scenery
          </Typography>
          <Box className={styles.hot}>Updated</Box>
        </Box>
        <Typography
          variant="h6"
          component="h5"
          className={styles.more}
          onClick={changeVisible}
        >
          More
        </Typography>
      </Box>
      <RecommendsCart recommends={recommends} />
      <ModalComponent visible={visible} setVisible={setVisible}>
        <PopupList cities={recommends} />
      </ModalComponent>
    </FetchWrapper>
  );
}

export default RecommendsBlock;
