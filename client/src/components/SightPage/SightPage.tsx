import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import DetailsPopular from "../DetailsSight/DetailsSight";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./SightPage.module.scss";

function SightPage() {
  const { id, sightId } = useParams();
  const { fetchSight } = useActions();

  useEffect(() => {
    fetchSight(sightId!);
  }, []);
  const { sight, error, loading } = useTypedSelector((state) => state.sight);
  const navigate = useNavigate();
  const closePage = () => {
    navigate(`/city/${id}/sights`);
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Box className={styles.sights_wrapper} onClick={closePage}>
              <Box className={styles.sights_content}>
                <DetailsPopular sight={sight} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SightPage;
