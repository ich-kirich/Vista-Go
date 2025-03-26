import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import DetailsPopular from "./components/DetailsSight/DetailsSight";
import FetchWrapper from "../../components/FetchWrapper/FetchWrapper";
import styles from "./SightPage.module.scss";
import { getRoute } from "../../libs/utils";
import { Routes } from "../../libs/enums";

function SightPage() {
  const { id, sightId } = useParams();
  const { fetchSight } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (sightId) fetchSight(sightId);
  }, [sightId]);
  const { sight, error, loading } = useTypedSelector((state) => state.sight);

  const closePage = () => {
    if (id) navigate(getRoute(Routes.SIGHTS, { id }));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {sight && (
        <Box className={styles.sights_wrapper} onClick={closePage}>
          <Box className={styles.sights_content}>
            <DetailsPopular sight={sight} />
          </Box>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default SightPage;
