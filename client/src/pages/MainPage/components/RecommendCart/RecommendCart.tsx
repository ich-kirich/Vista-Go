import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { createDate } from "../../../../libs/utils";
import styles from "./RecommendCart.module.scss";
import { IRecommends } from "../../../../types/types";

interface IRecommendCartProps {
  recommend: IRecommends;
  sliderRef: React.RefObject<Slider>;
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  idsRecommends: number[];
}

function RecommendCart(props: IRecommendCartProps) {
  const { recommend, sliderRef, currentSlide, setCurrentSlide, idsRecommends } =
    props;
  const navigate = useNavigate();

  const viewCity = () => {
    const index = idsRecommends.indexOf(recommend.id) + 1;
    if (index === currentSlide) {
      navigate(`/city/${recommend.CityId}`);
    } else {
      sliderRef.current?.slickGoTo(index - 1);
      setTimeout(() => {
        setCurrentSlide(index);
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
        <Box>
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
        <Box className={styles.guide__wrapper}>
          {recommend.guides.map((item) => (
            <Box
              key={item.id}
              className={styles.guide__img}
              sx={{
                backgroundImage: `url(${item.image})`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default RecommendCart;
