import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IListCitiesProps } from "../../types/types";
import styles from "./PopupList.module.scss";

function PopupList(props: IListCitiesProps) {
  const { cities } = props;
  const navigate = useNavigate();

  const viewCity = (id: number) => {
    navigate(`/city/${id}`);
  };

  return (
    <Grid container spacing={3}>
      {cities.map((item) => (
        <Grid key={item.id} item sm={4}>
          <Box
            className={styles.recommends__img}
            sx={{
              backgroundImage: `url(${item.image})`,
            }}
            onClick={() => viewCity(item.id)}
          >
            <Box className={styles.inf__wrapper}>
              <Typography
                variant="h6"
                component="h5"
                className={styles.recommends__name}
              >
                {item.name}, {item.country}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default PopupList;
