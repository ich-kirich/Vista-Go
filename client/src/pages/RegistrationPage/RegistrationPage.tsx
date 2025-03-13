import { Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../../components/Loader/Loader";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import VerificationField from "./components/VerificationField/VerificationField";
import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registrationClicked, setRegistrationClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  const formFields = [
    { label: "Enter your Name", name: "name", type: "text" },
    { label: "Enter your Email", name: "email", type: "email" },
    { label: "Enter your Password", name: "password", type: "password" },
  ];

  const { fetchRegistration } = useActions();
  const { error, loading } = useTypedSelector((state) => state.registration);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetchRegistration(formData.name, formData.email, formData.password);
    setRegistrationClicked(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <VerificationField email={formData.email} name={formData.name} />
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

              {formFields.map(({ label, name, type }) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              ))}
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
