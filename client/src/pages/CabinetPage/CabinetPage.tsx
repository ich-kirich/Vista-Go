import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import styles from "./CabinetPage.module.scss";
import { IUser } from "../../types/types";
import ViewError from "../../components/ViewError/ViewError";
import { ADMIN_ROLE, ERROR } from "../../libs/constants";
import ChangeUsername from "./components/ChangeUsername/ChangeUsername";
import useTypedSelector from "../../hooks/useTypedSelector";
import ChangeImage from "./components/ChangeImage/ChangeImage";
import ChangePassword from "./components/ChangePassword/ChangePassword";

function CabinetPage() {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [activeField, setActiveField] = useState<
    "name" | "image" | "password" | null
  >(null);
  const navigate = useNavigate();
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUserInfo(jwt_decode<IUser>(token));
      } catch {
        setError(ERROR.LOADING_USER);
      }
    } else {
      setError(ERROR.LOADING_USER);
    }
  }, [user]);

  if (error) return <ViewError>{error}</ViewError>;

  return (
    <Box className={styles.user__wrapper}>
      <Box className={styles.user__information}>
        <Box
          className={styles.user__img}
          sx={{ backgroundImage: `url(${userInfo?.image})` }}
        />
        <Box>
          <Typography variant="h6">Login: {userInfo?.email}</Typography>
          <Typography variant="h6">Name: {userInfo?.name}</Typography>
          <Typography variant="h6">Password: ••••••••</Typography>
        </Box>
      </Box>

      <Box className={styles.user__controls}>
        {["name", "image", "password"].map((field) => (
          <Button
            key={field}
            variant="contained"
            fullWidth
            onClick={() => setActiveField(field as typeof activeField)}
          >
            Change {field.charAt(0).toUpperCase() + field.slice(1)}
          </Button>
        ))}
        {user && user.role === ADMIN_ROLE && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/admin")}
          >
            Go to the admin panel
          </Button>
        )}
      </Box>

      {activeField === "name" && (
        <ChangeUsername
          visible
          setVisible={() => setActiveField(null)}
          userId={userInfo?.id}
        />
      )}
      {activeField === "image" && (
        <ChangeImage
          visible
          setVisible={() => setActiveField(null)}
          userId={userInfo?.id}
        />
      )}
      {activeField === "password" && (
        <ChangePassword
          visible
          setVisible={() => setActiveField(null)}
          email={userInfo?.email}
        />
      )}
    </Box>
  );
}

export default CabinetPage;
