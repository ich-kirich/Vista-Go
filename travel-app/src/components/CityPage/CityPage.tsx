import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import CityPanel from "../CityPanel/CityPanel";
import CityPopular from "../CityPopular/CityPopular";
import Loader from "../Loader/Loader";
import MustGo from "../MustGo/MustGo";
import styles from "./CityPage.module.scss";

function CityPage() {
  const [cityInformation, setCityInformation] = useState(null);

  useEffect(() => {
    const cityInfo = JSON.parse(localStorage.getItem("city")!);
    setCityInformation(cityInfo);
  }, []);

  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      {cityInformation ? (
        <>
          <CityPanel city={cityInformation} />
          <CityPopular city={cityInformation} />
          <MustGo city={cityInformation} />
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default CityPage;
