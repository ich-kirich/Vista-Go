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
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Box>
              <Box className={styles.header__wrapper}>
                <Box className={styles.title__wrapper}>
                  <Typography
                    variant="h6"
                    component="h2"
                    className={styles.title}
                  >
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
              <RecommendsCart cities={recommends} />
              <ModalComponent visible={visible} setVisible={setVisible}>
                <PopupList cities={recommends} />
              </ModalComponent>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default RecommendsBlock;
