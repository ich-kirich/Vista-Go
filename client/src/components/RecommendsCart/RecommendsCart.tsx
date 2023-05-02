import { useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./RecommendsCart.module.scss";
import { SETTINGS } from "../../libs/constants";
import RecommendCart from "../RecommendCart/RecommendCart";
import { IListCitiesProps } from "../../types/types";

function RecommendsCart(props: IListCitiesProps) {
  const { cities } = props;
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  return (
    <Slider
      {...SETTINGS}
      className={styles.recommends__wrapper}
      ref={sliderRef}
    >
      {cities.slice(0, 3).map((item) => (
        <RecommendCart
          key={item.id}
          recommend={item}
          sliderRef={sliderRef}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      ))}
    </Slider>
  );
}
export default RecommendsCart;
