import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createDate from "../../libs/utils";
import { IRecommendCartProps } from "../../types/types";
import styles from "./RecommendCart.module.scss";

function RecommendCart(props: IRecommendCartProps) {
  const { recommend, sliderRef } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  return (
    <Box
      key={recommend.id}
      className={styles.recommends__img}
      sx={{
        backgroundImage: `url(${recommend.cities[0].sights[0].image})`,
      }}
      onClick={() => {
        if (recommend.id - 1 === currentSlide) {
          localStorage.setItem("city", JSON.stringify(recommend.cities[0]));
          navigate("/city");
        } else {
          setTimeout(() => {
            setCurrentSlide(recommend.id - 1);
          }, 500);
          sliderRef.current?.slickGoTo(recommend.id - 1);
        }
      }}
    >
      <Box className={styles.inf__wrapper}>
        <Typography
          variant="h6"
          component="h5"
          className={styles.recommends__data}
        >
          {createDate(new Date(Date.now()))}
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.recommends__name}
        >
          {recommend.cities[0].name}, {recommend.country}
        </Typography>
      </Box>
    </Box>
  );
}

export default RecommendCart;
