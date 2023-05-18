import { Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ISightProps } from "../../types/types";
import PopularControls from "../PopularControls/PopularControls";
import PopularSight from "../PopularSight/PopularSight";
import styles from "./CityPopular.module.scss";

function CityPopular(props: ISightProps) {
  const { sight } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const changeVisible = () => {
    navigate(`/city/${id}/sights`);
  };

  return (
    <Box className={styles.popular__wrapper}>
      <Box className={styles.city__wrapper}>
        <Typography variant="h6" component="h5" className={styles.title}>
          Popular
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.more}
          onClick={changeVisible}
        >
          More
        </Typography>
      </Box>
      <PopularSight sight={sight} />
      <PopularControls sight={sight} />
    </Box>
  );
}

export default CityPopular;
