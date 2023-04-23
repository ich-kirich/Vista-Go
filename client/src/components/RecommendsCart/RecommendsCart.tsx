import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import Slider from "react-slick";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./RecommendsCart.module.scss";
import { SETTINGS } from "../../libs/constants";
import RecommendCart from "../RecommendCart/RecommendCart";

function RecommendsCart() {
  const { fetchRecommend } = useActions();
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
              {...SETTINGS}
              className={styles.recommends__wrapper}
              ref={sliderRef}
            >
              {recommend.map((item) => (
                <RecommendCart recommend={item} sliderRef={sliderRef} />
              ))}
            </Slider>
          )}
        </Box>
      )}
    </Box>
  );
}
export default RecommendsCart;
