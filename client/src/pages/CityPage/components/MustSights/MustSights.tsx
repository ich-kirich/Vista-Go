import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./MustSights.module.scss";

function MustSights() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchSights } = useActions();
  const { sights, error, loading } = useTypedSelector((state) => state.sights);

  useEffect(() => {
    if (id) fetchSights(id);
  }, [id]);

  if (!sights.length) return null;

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.sights__wrapper}>
        <Box
          sx={{ backgroundImage: `url(${sights[0]?.image})` }}
          className={styles.sight__first}
          onClick={() => navigate(`/city/${id}/sights/${sights[0].id}`)}
        />
        <Box className={styles.wrapper}>
          {sights.length > 1 && (
            <Box
              sx={{ backgroundImage: `url(${sights[1]?.image})` }}
              className={styles.sight__second}
              onClick={() => navigate(`/city/${id}/sights/${sights[1].id}`)}
            />
          )}
          <Box className={styles.sight__wrapper}>
            {sights.length > 2 && (
              <Box
                sx={{ backgroundImage: `url(${sights[2]?.image})` }}
                className={styles.sight__third}
                onClick={() => navigate(`/city/${id}/sights/${sights[2].id}`)}
              />
            )}
            {sights.length > 3 && (
              <Box
                className={styles.sight__amount}
                onClick={() => navigate(`/city/${id}/sights`)}
              >
                <Typography variant="h6" className={styles.amount__text}>
                  {sights.length}+
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </FetchWrapper>
  );
}

export default MustSights;
