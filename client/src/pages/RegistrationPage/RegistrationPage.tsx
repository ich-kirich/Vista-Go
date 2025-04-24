import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../../components/Loader/Loader";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import VerificationField from "./components/VerificationField/VerificationField";
import { Routes } from "../../libs/enums";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styles from "./RegistrationPage.module.scss";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registrationClicked, setRegistrationClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formFields = [
    { label: t("registration_page.enter_name"), name: "name", type: "text" },
    { label: t("registration_page.enter_email"), name: "email", type: "email" },
    {
      label: t("registration_page.enter_password"),
      name: "password",
      type: "password",
    },
  ];

  const { fetchRegistration } = useActions();
  const { error, loading } = useTypedSelector((state) => state.registration);
  const { user } = useTypedSelector((state) => state.user);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    fetchRegistration(formData.name, formData.email, formData.password);
    setRegistrationClicked(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (registrationClicked && !loading && !error) {
      setVisible(true);
    }
    if (user) {
      navigate(Routes.HOME);
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
                {t(error)}
              </Typography>
            )}
            <Box className={styles.registration__form}>
              <Typography
                variant="h6"
                component="h2"
                className={styles.registration__title}
              >
                {t("registration_page.registration")}
              </Typography>

              {formFields.map(({ label, name, type }) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={name === "password" && showPassword ? "text" : type}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: name === "password" && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              ))}
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                {t("registration_page.register_account")}
              </Button>
              <Link className={styles.registration__link} to={Routes.LOGIN}>
                {t("registration_page.have_account")}
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default RegistrationPage;
