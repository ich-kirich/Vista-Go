import { Box, InputAdornment, TextField } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EastIcon from "@mui/icons-material/East";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SearchField.module.scss";
import { CONTEXT } from "../../../../libs/constants";

interface ISearchFieldProps {
  setNameCity: (nameCity: string) => void;
  nameCity: string;
}

function SearchField({ nameCity, setNameCity }: ISearchFieldProps) {
  const { setVisible } = useContext(CONTEXT);
  const { t } = useTranslation();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNameCity(e.target.value);
    setVisible(true);
  };

  return (
    <Box>
      <TextField
        id="city"
        variant="standard"
        placeholder={t("search_field.placeholder")}
        size="small"
        type="search"
        value={nameCity}
        fullWidth
        onChange={(e) => handleInput(e)}
        className={styles.city__input}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <RoomIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <EastIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchField;
