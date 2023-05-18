import { Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import PopupComponent from "../PopupComponent/PopupComponent";
import VerificationField from "../VerificationField/VerificationField";
import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationClicked, setRegistrationClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const { fetchRegistration } = useActions();
  const { error, loading } = useTypedSelector((state) => state.registration);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetchRegistration(name, email, password);
    setRegistrationClicked(true);
  };

  useEffect(() => {
    if (registrationClicked && !loading && !error) {
      setVisible(true);
    }
  }, [registrationClicked, loading, error]);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <PopupComponent visible={visible} setVisible={setVisible}>
            <VerificationField email={email} name={name} password={password} />
          </PopupComponent>
          <Box className={styles.registration__wrapper}>
            {error && (
              <Typography
                variant="h6"
                component="h2"
                className={styles.registration__title}
              >
                {error}
              </Typography>
            )}
            <Box className={styles.registration__form}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.registration__title}
              >
                Registration
              </Typography>
              <TextField
                label="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Enter your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Register account
              </Button>
              <Link className={styles.registration__link} to="/">
                You have account?
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RegistrationPage;
