import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader__animation} />
    </div>
  );
}

export default Loader;
