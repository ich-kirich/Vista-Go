import { Box, Container, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import useTypedSelector from "../../hooks/useTypedSelector";
import { CONTEXT } from "../../libs/constants";
import CitiesBlock from "./components/CitiesBlock/CitiesBlock";
import ListGuides from "./components/ListGuides/ListGuides";
import RecommendsBlock from "./components/RecommendsBlock/RecommendsBlock";
import SearchField from "./components/SearchFieid/SearchField";
import styles from "./MainPage.module.scss";
import ViewError from "../../components/ViewError/ViewError";
import { AppError } from "../../libs/enums";
import { getValidToken } from "../../libs/utils";
import { useTranslation } from "react-i18next";

function MainPage() {
  const [city, setCity] = useState("");
  const [view, setView] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useTypedSelector((state) => state.user);
  const { t } = useTranslation();

  const contextValue = useMemo(
    () => ({
      nameCity: city,
      visible: view,
      setVisible: setView,
    }),
    [city, view, setView],
  );

  const getUserInfo = () => {
    const userInfo = user || getValidToken();
    if (userInfo) {
      try {
        setUsername(userInfo.name);
      } catch {
        setError(AppError.LOADING_USER);
      }
    } else {
      setError(AppError.LOADING_USER);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  return (
    <Container maxWidth="lg">
      {error ? (
        <ViewError>{error}</ViewError>
      ) : (
        <Box className={styles.app__wrapper}>
          <Typography variant="h6" component="h2" className={styles.app__title}>
            {t("main_page.greeting")} {username}
          </Typography>
          <Typography variant="h6" component="h2" className={styles.app__title}>
            {t("main_page.destination_question")}
          </Typography>
          <CONTEXT.Provider value={contextValue}>
            <SearchField nameCity={city} setNameCity={setCity} />
            <Box className={styles.inf__wrapper}>
              <RecommendsBlock />
              <CitiesBlock />
              <ListGuides />
            </Box>
          </CONTEXT.Provider>
        </Box>
      )}
    </Container>
  );
}

export default MainPage;
