import { Container, Typography } from "@mui/material";
import CitiesBlock from "../CitiesBlock/CitiesBlock";
import SearchField from "../SearchFieid/SearchField";
import styles from "./MainPage.module.scss";

function MainPage() {
  return (
    <Container maxWidth="sm" className={styles.app__wrapper}>
      <Typography variant="h6" component="h2" className={styles.app__title}>
        Where do you want to go?
      </Typography>
      <SearchField />
      <CitiesBlock />
    </Container>
  );
}

export default MainPage;
