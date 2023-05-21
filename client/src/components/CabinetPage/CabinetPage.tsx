import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../ViewError/ViewError";
import { ERROR_LOADING_USER } from "../../libs/constants";
import ChangeUsername from "../ChangeUsername/ChangeUsername";
import useTypedSelector from "../../hooks/useTypedSelector";
import ChangeImage from "../ChangeImage/ChangeImage";
import ChangePassword from "../ChangePassword/ChangePassword";

function CabinetPage() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser>();
  const [visibleFieldName, setVisibleFieldName] = useState(false);
  const [visibleImageField, setVisibleImageField] = useState(false);
  const [visibleCodeField, setVisibleCodeField] = useState(false);

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
    setVisibleFieldName(true);
    setVisibleImageField(false);
    setVisibleCodeField(false);
  };

  const viewImageField = () => {
    setVisibleImageField(true);
    setVisibleFieldName(false);
    setVisibleCodeField(false);
  };

  const viewCodeField = () => {
    setVisibleCodeField(true);
    setVisibleImageField(false);
    setVisibleFieldName(false);
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
                  backgroundImage: `url(${userInfo?.image})`,
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
            <Button variant="contained" fullWidth onClick={viewImageField}>
              Change Avatar
            </Button>
            <Button variant="contained" fullWidth onClick={viewCodeField}>
              Change Password
            </Button>
          </Box>
          <ChangeUsername
            visible={visibleFieldName}
            setVisible={setVisibleFieldName}
            userId={userInfo?.id}
          />
          <ChangeImage
            visible={visibleImageField}
            setVisible={setVisibleImageField}
            userId={userInfo?.id}
          />
          <ChangePassword
            visible={visibleCodeField}
            setVisible={setVisibleCodeField}
            email={userInfo?.email}
          />
        </Box>
      )}
    </Box>
  );
}

export default CabinetPage;
