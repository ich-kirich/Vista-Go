import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import styles from "./ErrorPage.module.scss";
import { Routes } from "../../libs/enums";

function ErrorPage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(Routes.LOGIN);
  };

  return (
    <Box className={styles.errorPage}>
      <div className={styles.errorPage__content}>
        <ErrorOutlineIcon color="error" className={styles.errorPage__icon} />
        <Typography
          variant="h2"
          component="h1"
          className={styles.errorPage__title}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          className={styles.errorPage__subtitle}
        >
          Page Not Found
        </Typography>
        <Typography variant="body1" className={styles.errorPage__message}>
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.errorPage__button}
          onClick={goHome}
        >
          Go to Home
        </Button>
      </div>
    </Box>
  );
}

export default ErrorPage;
