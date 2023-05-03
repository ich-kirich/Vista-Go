import { Box, Container, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { CONTEXT } from "../../libs/constants";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import RecommendsBlock from "../RecommendsBlock/RecommendsBlock";
import SearchField from "../SearchFieid/SearchField";
import styles from "./MainPage.module.scss";

function MainPage() {
  const [city, setCity] = useState("");
  const [view, setView] = useState(false);
  const contextValue = useMemo(
    () => ({
      nameCity: city,
      visible: view,
      setVisible: setView,
    }),
    [city, view, setView],
  );
  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      <Typography variant="h6" component="h2" className={styles.app__title}>
        Where do you want to go?
      </Typography>
      <CONTEXT.Provider value={contextValue}>
        <SearchField nameCity={city} setNameCity={setCity} />
        <Box className={styles.inf__wrapper}>
          <RecommendsBlock />
          <CitiesBlock />
        </Box>
      </CONTEXT.Provider>
    </Container>
  );
}

export default MainPage;
