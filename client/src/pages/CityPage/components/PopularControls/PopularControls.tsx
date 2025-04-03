import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./PopularControls.module.scss";
import { ISightProps } from "../../../../types/types";
import { getRoute } from "../../../../libs/utils";
import { Routes } from "../../../../libs/enums";

function PopularControls({ sight }: ISightProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const closePage = () => {
    if (id) navigate(getRoute(Routes.SIGHT_DETAILS, { id, sightId: sight.id }));
  };

  const buttons = [
    { label: t("popular_controls.details") },
    { label: t("popular_controls.navigation") },
  ];

  return (
    <Box className={styles.btns__wrapper}>
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        className={styles.btns__group}
      >
        {buttons.map(({ label }) => (
          <Button key={label} className={styles.btn} onClick={closePage}>
            <Typography
              variant="h6"
              component="h5"
              className={styles.btn__text}
            >
              {label}
            </Typography>
            <ArrowForwardIosIcon
              fontSize="small"
              className={styles.btn__icon}
            />
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default PopularControls;
