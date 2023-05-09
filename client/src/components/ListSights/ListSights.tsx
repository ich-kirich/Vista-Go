import { Box, Grid, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ICityProps, ISights } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import styles from "./ListSights.module.scss";

function ListSights(props: ICityProps) {
  const { city } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const changeVisible = (e: MouseEvent, sight: ISights) => {
    e.stopPropagation();
    navigate(`/city/${id}/sights/${sight.id}`);
  };

  return (
    <Box>
      {!city.sights || city.sights.length === 0 ? (
        <ViewError>No sights Found</ViewError>
      ) : (
        <Grid container spacing={3}>
          {city.sights.map((item) => (
            <Grid key={item.id} item sm={4}>
              <Box
                className={styles.cart__img}
                sx={{
                  backgroundImage: `url(${item.image})`,
                }}
                onClick={(e) => changeVisible(e, item)}
              >
                <Box className={styles.inf__wrapper}>
                  <Typography
                    variant="h6"
                    component="h5"
                    className={styles.cart__name}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ListSights;
