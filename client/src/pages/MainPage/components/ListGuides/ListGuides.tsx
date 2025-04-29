import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import styles from "./ListGuides.module.scss";
import GuideRequestModal from "../GuideRequestModal/GuideRequestModal";

function ListGuides() {
  const { fetchGuides } = useActions();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  useEffect(() => {
    if (!guides) fetchGuides();
  }, []);

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
        <Button
          variant="text"
          className={styles.guide__joying}
          onClick={() => setIsModalOpen(true)}
        >
          {t("list_guides.join")}
        </Button>
      </Box>
      <GuideRequestModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </FetchWrapper>
  );
}

export default ListGuides;
