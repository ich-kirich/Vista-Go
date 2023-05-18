import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ListSights from "../ListSights/ListSights";
import ViewError from "../ViewError/ViewError";
import styles from "./SightsPage.module.scss";

function SightsPage() {
  const { id } = useParams();
  const { fetchSights } = useActions();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSights(id!);
  }, []);
  const { sights, error, loading } = useTypedSelector((state) => state.sights);

  const closePage = () => {
    navigate(`/city/${id}`);
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
                <ListSights sights={sights} />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SightsPage;
