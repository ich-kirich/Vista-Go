import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./ListGuides.module.scss";

function ListGuides() {
  const { fetchGuides } = useActions();
  useEffect(() => {
    fetchGuides();
  }, []);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.header__wrapper}>
        <Box className={styles.title__wrapper}>
          <Typography variant="h6" component="h2" className={styles.title}>
            Master
          </Typography>
        </Box>
      </Box>
      <Box className={styles.guide__wrapper}>
        {guides.slice(0, 3).map((item) => (
          <Box
            key={item.id}
            className={styles.guide__img}
            sx={{
              backgroundImage: `url(${item.image})`,
            }}
          />
        ))}
        <Button variant="text" className={styles.guide__joing}>
          Join them.
        </Button>
      </Box>
    </FetchWrapper>
  );
}

export default ListGuides;
