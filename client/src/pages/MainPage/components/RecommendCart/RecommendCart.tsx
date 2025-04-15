import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { createDate, getRoute } from "../../../../libs/utils";
import styles from "./RecommendCart.module.scss";
import { IRecommends } from "../../../../types/types";
import { Locales, Routes } from "../../../../libs/enums";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();

  const language = i18n.language as Locales;

  const viewCity = () => {
    const index = idsRecommends.indexOf(recommend.id) + 1;

    const isMobile = window.innerWidth < 650;

    if (index === currentSlide) {
      navigate(getRoute(Routes.CITY, { id: recommend.CityId }));
      return;
    }

    if (isMobile) {
      navigate(getRoute(Routes.CITY, { id: recommend.CityId }));
      return;
    }

    if (!isMobile) {
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
            {recommend.name[language]}, {recommend.country[language]}
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
