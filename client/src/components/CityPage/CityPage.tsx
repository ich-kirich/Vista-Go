import { Container } from "@mui/material";
import CityPanel from "../CityPanel/CityPanel";
import CityPopular from "../CityPopular/CityPopular";
import MustGo from "../MustGo/MustGo";
import styles from "./CityPage.module.scss";

function CityPage() {
  const cityIformation = JSON.parse(localStorage.getItem("city")!);
  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      <CityPanel city={cityIformation} />
      <CityPopular city={cityIformation} />
      <MustGo />
    </Container>
  );
}

export default CityPage;
