import { Box, Grid, Typography } from "@mui/material";
import { MouseEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ISights } from "../../../../types/types";
import styles from "./ListSights.module.scss";
import { getRoute } from "../../../../libs/utils";
import { Locales, Routes } from "../../../../libs/enums";
import { useTranslation } from "react-i18next";

interface IListSightsProps {
  sights: ISights[];
}

function ListSights({ sights }: IListSightsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const language = i18n.language as Locales;

  const changeVisible = (e: MouseEvent, sight: ISights) => {
    e.stopPropagation();
    if (id) navigate(getRoute(Routes.SIGHT_DETAILS, { id, sightId: sight.id }));
  };

  return (
    <Grid container spacing={3}>
      {sights.map((item) => (
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
                {item.name[language] || item.name.en}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ListSights;
