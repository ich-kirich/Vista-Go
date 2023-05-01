import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createDate } from "../../libs/utils";
import { IRecommendCartProps } from "../../types/types";
import styles from "./RecommendCart.module.scss";

function RecommendCart(props: IRecommendCartProps) {
  const { recommend, sliderRef, currentSlide, setCurrentSlide } = props;
  const navigate = useNavigate();
  const viewCity = () => {
    if (recommend.id === currentSlide) {
      navigate(`/city/${recommend.id}`);
    } else {
      sliderRef.current?.slickGoTo(recommend.id - 1);
      setTimeout(() => {
        setCurrentSlide(recommend.id);
      }, 500);
    }
  };
  return (
    <Box
      className={styles.recommends__img}
      sx={{
        backgroundImage: `url(${recommend.image})`,
      }}
      onClick={viewCity}
    >
      <Box className={styles.inf__wrapper}>
        <Typography
          variant="h6"
          component="h5"
          className={styles.recommends__data}
        >
          {createDate(new Date(recommend.updatedAt))}
        </Typography>
        <Typography
          variant="h6"
          component="h5"
          className={styles.recommends__name}
        >
          {recommend.name}, {recommend.country}
        </Typography>
      </Box>
    </Box>
  );
}

export default RecommendCart;
