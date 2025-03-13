import { Box, Container, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import jwt_decode from "jwt-decode";
import useTypedSelector from "../../hooks/useTypedSelector";
import { CONTEXT, ERROR_LOADING_USER } from "../../libs/constants";
import { IUser } from "../../types/types";
import CitiesBlock from "./components/CitiesBlock/CitiesBlock";
import ListGuides from "./components/ListGuides/ListGuides";
import RecommendsBlock from "./components/RecommendsBlock/RecommendsBlock";
import SearchField from "./components/SearchFieid/SearchField";
import styles from "./MainPage.module.scss";
import ViewError from "../../components/ViewError/ViewError";

function MainPage() {
  const [city, setCity] = useState("");
  const [view, setView] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const { user } = useTypedSelector((state) => state.user);

  const contextValue = useMemo(
    () => ({
      nameCity: city,
      visible: view,
      setVisible: setView,
    }),
    [city, view, setView],
  );

  const getUserInfo = () => {
    const data = localStorage.getItem("token");
    if (data) {
      try {
        const info: IUser = jwt_decode(data);
        setUsername(info.name);
      } catch {
        setError(ERROR_LOADING_USER);
      }
    } else {
      setError(ERROR_LOADING_USER);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  return (
    <Container maxWidth="sm">
      {error ? (
        <ViewError>{error}</ViewError>
      ) : (
        <Box className={styles.app__wrapper}>
          <Typography variant="h6" component="h2" className={styles.app__title}>
            Hi {username},
          </Typography>
          <Typography variant="h6" component="h2" className={styles.app__title}>
            Where do you want to go?
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
