import {
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Oval,
  Puff,
  Rings,
  TailSpin,
  ThreeDots,
} from "react-loader-spinner";
import {
  LOCAL_STORAGE_KEY_SPINNER_DATE,
  LOCAL_STORAGE_KEY_SPINNER_INDEX,
} from "../../libs/constants";

import styles from "./Loader.module.scss";

const spinnerComponents = [
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Oval,
  Puff,
  Rings,
  TailSpin,
  ThreeDots,
];

const getRandomSpinner = () => {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem(LOCAL_STORAGE_KEY_SPINNER_DATE) ?? "";
  let spinnerIndex = parseInt(
    localStorage.getItem(LOCAL_STORAGE_KEY_SPINNER_INDEX) ?? "",
    10,
  );

  if (savedDate !== today || isNaN(spinnerIndex)) {
    spinnerIndex = Math.floor(Math.random() * spinnerComponents.length);
    localStorage.setItem(LOCAL_STORAGE_KEY_SPINNER_DATE, today);
    localStorage.setItem(LOCAL_STORAGE_KEY_SPINNER_INDEX, String(spinnerIndex));
  }

  return spinnerComponents[spinnerIndex];
};

export const Loader = () => {
  const Spinner = getRandomSpinner();
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__indicator}>
        {Spinner && <Spinner color="#00BFFF" height={80} width={80} />}
      </div>
    </div>
  );
};

export default Loader;
