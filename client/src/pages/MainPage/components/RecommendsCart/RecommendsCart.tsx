import { useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./RecommendsCart.module.scss";
import { SLIDER_SETTINGS } from "../../../../libs/constants";
import RecommendCart from "../RecommendCart/RecommendCart";
import { IRecommends } from "../../../../types/types";

interface IListRecommendsProps {
  recommends: IRecommends[];
}

function RecommendsCart({ recommends }: IListRecommendsProps) {
  const idsRecommends = recommends.map((item) => item.id);
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <Slider
      {...SLIDER_SETTINGS}
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
