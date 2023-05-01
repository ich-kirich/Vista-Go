import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./RecommendsCart.module.scss";
import { SETTINGS } from "../../libs/constants";
import RecommendCart from "../RecommendCart/RecommendCart";

function RecommendsCart() {
  const { fetchRecommends } = useActions();
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  useEffect(() => {
    fetchRecommends();
  }, []);
  const { recommends, error, loading } = useTypedSelector(
    (state) => state.recommends,
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
              {...SETTINGS}
              className={styles.recommends__wrapper}
              ref={sliderRef}
            >
              {recommends.map((item) => (
                <RecommendCart
                  key={item.id}
                  recommend={item}
                  sliderRef={sliderRef}
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                />
              ))}
            </Slider>
          )}
        </Box>
      )}
    </Box>
  );
}
export default RecommendsCart;
