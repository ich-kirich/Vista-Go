import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { ISights } from "../../types/types";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./MustSights.module.scss";

function MustSights() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchSights } = useActions();

  useEffect(() => {
    fetchSights(id!);
  }, []);
  const { sights, error, loading } = useTypedSelector((state) => state.sights);

  const viewSight = (sight: ISights) => {
    navigate(`/city/${id}/sights/${sight.id}`);
  };

  const viewSightsPage = () => {
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
            <Box className={styles.signts__wrapper}>
              <Box
                sx={{
                  backgroundImage: `url(${sights[0].image})`,
                }}
                className={styles.sight__first}
                onClick={() => viewSight(sights[0])}
              />
              <Box className={styles.wrapper}>
                {sights.length >= 2 && (
                  <Box
                    sx={{
                      backgroundImage: `url(${sights[1].image})`,
                    }}
                    className={styles.sight__second}
                    onClick={() => viewSight(sights[1])}
                  />
                )}
                <Box className={styles.sight__wrapper}>
                  {sights.length >= 3 && (
                    <Box
                      sx={{
                        backgroundImage: `url(${sights[2].image})`,
                      }}
                      className={styles.sight__third}
                      onClick={() => viewSight(sights[2])}
                    />
                  )}
                  {sights.length >= 4 && (
                    <Box
                      className={styles.sight__amount}
                      onClick={viewSightsPage}
                    >
                      <Typography
                        variant="h6"
                        component="h5"
                        className={styles.amount__text}
                      >
                        {sights.length}+
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default MustSights;
