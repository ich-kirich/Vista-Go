import { Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MustSights from "../MustSights/MustSights";
import styles from "./MustGo.module.scss";
import { getRoute } from "../../../../libs/utils";
import { Routes } from "../../../../libs/enums";

function MustGo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const viewSightsPage = () => {
    if (id) navigate(getRoute(Routes.SIGHTS, { id }));
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
          onClick={viewSightsPage}
        >
          More
        </Typography>
      </Box>
      <MustSights />
    </Box>
  );
}

export default MustGo;
