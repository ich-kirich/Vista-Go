import { Container } from "@mui/material";
import CityPanel from "../CityPanel/CityPanel";
import CityPopular from "../CityPopular/CityPopular";
import styles from "./CityPage.module.scss";

function CityPage() {
  const cityIformation = JSON.parse(localStorage.getItem("city")!);
  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      <CityPanel city={cityIformation} />
      <CityPopular city={cityIformation} />
    </Container>
  );
}

export default CityPage;
