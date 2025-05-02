import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import styles from "./ListGuides.module.scss";
import GuideRequestModal from "../GuideRequestModal/GuideRequestModal";
import { useNavigate } from "react-router-dom";
import { getRoute, getValidToken } from "../../../../libs/utils";
import { ROLES, Routes } from "../../../../libs/enums";

function ListGuides() {
  const { fetchGuides } = useActions();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  useEffect(() => {
    if (!guides) fetchGuides();
  }, []);

  const viewGuide = (id: number) => {
    navigate(getRoute(Routes.GUIDE, { id }));
  };

  const viewGuideRequestModal = () => {
    user || getValidToken() ? setIsModalOpen(true) : navigate(Routes.LOGIN);
  };

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
              onClick={() => viewGuide(item.id)}
            />
          ))}
        <Button
          variant="text"
          className={styles.guide__joying}
          onClick={viewGuideRequestModal}
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
