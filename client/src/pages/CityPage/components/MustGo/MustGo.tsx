import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MustSights from "../MustSights/MustSights";
import styles from "./MustGo.module.scss";
import { getRoute } from "../../../../libs/utils";
import { Routes } from "../../../../libs/enums";
import { useTranslation } from "react-i18next";

function MustGo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const viewSightsPage = () => {
    if (id) navigate(getRoute(Routes.SIGHTS, { id }));
  };

  return (
    <Box className={styles.go__wrapper}>
      <Box className={styles.must__wrapper}>
        <Typography variant="h6" component="h5" className={styles.title}>
          {t("must_go.title")}
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.more}
          onClick={viewSightsPage}
        >
          {t("must_go.more")}
        </Typography>
      </Box>
      <MustSights />
    </Box>
  );
}

export default MustGo;
