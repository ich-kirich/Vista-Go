import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import ModalComponent from "../ModalComponent/ModalComponent";
import RecommendsCart from "../RecommendsCart/RecommendsCart";
import PopupList from "../PopupList/PopupList";
import { useTranslation } from "react-i18next";
import styles from "./RecommendsBlock.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";

function RecommendsBlock() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const changeVisible = () => {
    setVisible(true);
  };

  const { fetchRecommends } = useActions();
  useEffect(() => {
    if (!recommends) fetchRecommends();
  }, []);
  const { recommends, error, loading } = useTypedSelector(
    (state) => state.recommends,
  );

  return (
    <FetchWrapper loading={loading} error={error}>
      {recommends && (
        <>
          <Box className={styles.header__wrapper}>
            <Box className={styles.title__wrapper}>
              <Typography variant="h6" component="h2" className={styles.title}>
                {t("recommends_block.daily_scenery")}
              </Typography>
              <Box className={styles.hot}>{t("recommends_block.updated")}</Box>
            </Box>
            <Typography
              variant="h6"
              component="h5"
              className={styles.more}
              onClick={changeVisible}
            >
              {t("recommends_block.more")}
            </Typography>
          </Box>
          <RecommendsCart recommends={recommends} />
          <ModalComponent visible={visible} setVisible={setVisible}>
            <PopupList cities={recommends} />
          </ModalComponent>
        </>
      )}
    </FetchWrapper>
  );
}

export default RecommendsBlock;
