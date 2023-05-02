import { Box, Grid, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { ICityProps, ISights } from "../../types/types";
import DetailsPopular from "../DetailsSight/DetailsSight";
import ModalComponent from "../ModalComponent/ModalComponent";
import ViewError from "../ViewError/ViewError";
import styles from "./PopupSights.module.scss";

function PopupSights(props: ICityProps) {
  const { city } = props;
  const [visible, setVisible] = useState(false);
  const [chooseSight, setChooseSight] = useState<ISights>({} as ISights);

  const changeVisible = (e: MouseEvent, sight: ISights) => {
    e.stopPropagation();
    setVisible(true);
    setChooseSight(sight);
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
              <ModalComponent visible={visible} setVisible={setVisible}>
                <DetailsPopular sight={chooseSight} />
              </ModalComponent>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default PopupSights;
