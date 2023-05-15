import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import { ERROR_LOADING_USER } from "../../libs/constants";
import ChangeUsername from "../ChangeUsername/ChangeUsername";
import useTypedSelector from "../../hooks/useTypedSelector";

function CabinetPage() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const [visibleFieldName, setVisibleFieldName] = useState(false);

  const { user } = useTypedSelector((state) => state.user);

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

  const viewNameField = () => {
    setVisibleFieldName(!visibleFieldName);
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  return (
    <Box>
      {error ? (
        <ViewError>{error}</ViewError>
      ) : (
        <Box className={styles.user__wrapper}>
          <Box className={styles.user__information}>
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
              <Box>
                <Typography variant="h6" component="h2">
                  Name: {userInfo?.name}
                </Typography>
              </Box>
              <Typography variant="h6" component="h2">
                Password: ••••••••
              </Typography>
            </Box>
          </Box>
          <Box className={styles.user__controls}>
            <Button variant="contained" fullWidth onClick={viewNameField}>
              Change Name
            </Button>
          </Box>
          <ChangeUsername
            visible={visibleFieldName}
            setVisible={setVisibleFieldName}
            userId={userInfo?.id}
          />
        </Box>
      )}
    </Box>
  );
}

export default CabinetPage;
