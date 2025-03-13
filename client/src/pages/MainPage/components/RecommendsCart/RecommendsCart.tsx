import { useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./RecommendsCart.module.scss";
import { SETTINGS } from "../../../../libs/constants";
import RecommendCart from "../RecommendCart/RecommendCart";
import { IListRecommendsProps } from "../../../../types/types";

function RecommendsCart(props: IListRecommendsProps) {
  const { recommends } = props;
  const idsRecommends = recommends.map((item) => item.id);
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <Slider
      {...SETTINGS}
      className={styles.recommends__wrapper}
      ref={sliderRef}
    >
      {recommends.slice(0, 3).map((item) => (
        <RecommendCart
          key={item.id}
          recommend={item}
          sliderRef={sliderRef}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          idsRecommends={idsRecommends}
        />
      ))}
    </Slider>
  );
}
export default RecommendsCart;
