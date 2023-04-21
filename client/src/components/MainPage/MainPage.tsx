import { Container, Typography } from "@mui/material";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import RecommendsBlock from "../RecommendsBlock/RecommendsBlock";
import SearchField from "../SearchFieid/SearchField";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      <Typography variant="h6" component="h2" className={styles.app__title}>
        Where do you want to go?
      </Typography>
      <SearchField />
      <RecommendsBlock />
      <CitiesBlock />
    </Container>
  );
}

export default MainPage;
