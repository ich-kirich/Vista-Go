import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import DetailsPopular from "../DetailsSight/DetailsSight";
import FetchWrapper from "../FetchWrapper/FetchWrapper";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./SightPage.module.scss";

function SightPage() {
  const { id, sightId } = useParams();
  const { fetchSight } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSight(sightId!);
  }, []);
  const { sight, error, loading } = useTypedSelector((state) => state.sight);

  const closePage = () => {
    navigate(`/city/${id}/sights`);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.sights_wrapper} onClick={closePage}>
        <Box className={styles.sights_content}>
          <DetailsPopular sight={sight} />
        </Box>
      </Box>
    </FetchWrapper>
  );
}

export default SightPage;
