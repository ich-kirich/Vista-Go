import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import styles from "./ListGuides.module.scss";

function ListGuides() {
  const { fetchGuides } = useActions();
  const { t } = useTranslation();

  useEffect(() => {
    if (!guides) fetchGuides();
  }, []);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.header__wrapper}>
        <Box className={styles.title__wrapper}>
          <Typography variant="h6" component="h2" className={styles.title}>
            {t("list_guides.guides")}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.guide__wrapper}>
        {guides &&
          guides.slice(0, 3).map((item) => (
            <Box
              key={item.id}
              className={styles.guide__img}
              sx={{
                backgroundImage: `url(${item.image})`,
              }}
            />
          ))}
        <Button variant="text" className={styles.guide__joying}>
          {t("list_guides.join")}
        </Button>
      </Box>
    </FetchWrapper>
  );
}

export default ListGuides;
