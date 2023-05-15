import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import { ERROR_LOADING_USER } from "../../libs/constants";

function CabinetPage() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const getUserInfo = () => {
    const data = localStorage.getItem("token");
    if (data) {
      try {
        const info: IUser = jwt_decode(data);
        setUserInfo(info);
      } catch {
        setError(ERROR_LOADING_USER);
      }
    } else {
      setError(ERROR_LOADING_USER);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box>
      {error ? (
        <ViewError>{error}</ViewError>
      ) : (
        <Box className={styles.user__wrapper}>
          <Box>
            <Box
              className={styles.user__img}
              sx={{
                backgroundImage: `url(${
                  userInfo && process.env.REACT_APP_BASE_URL
                }${userInfo?.image})`,
              }}
            />
          </Box>
          <Box>
            <Typography variant="h6" component="h2">
              Login: {userInfo?.email}
            </Typography>
            <Typography variant="h6" component="h2">
              Name: {userInfo?.name}
            </Typography>
            <Typography variant="h6" component="h2">
              Password: ••••••••
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CabinetPage;
