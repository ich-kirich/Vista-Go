import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import createDate from "../../libs/utils";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./RecommendsCart.module.scss";
import { settings } from "../../libs/constants";

function RecommendsCart() {
  const { fetchRecommend } = useActions();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);
  useEffect(() => {
    fetchRecommend();
  }, []);
  const { recommend, error, loading } = useTypedSelector(
    (state) => state.recommend,
  );
  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Slider
              {...settings}
              className={styles.recommends__wrapper}
              ref={sliderRef}
            >
              {recommend.map((item) => (
                <Box
                  key={item.id}
                  className={styles.recommends__img}
                  sx={{
                    backgroundImage: `url(${item.cities[0].sights[0].image})`,
                  }}
                  onClick={() => {
                    if (item.id - 1 === currentSlide) {
                      localStorage.setItem(
                        "city",
                        JSON.stringify(item.cities[0]),
                      );
                      navigate("/city");
                    } else {
                      setTimeout(() => {
                        setCurrentSlide(item.id - 1);
                      }, 500);
                      sliderRef.current?.slickGoTo(item.id - 1);
                    }
                  }}
                >
                  <Box className={styles.wrapper__inf}>
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
                      {item.cities[0].name}, {item.country}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Slider>
          )}
        </Box>
      )}
    </Box>
  );
}
export default RecommendsCart;
