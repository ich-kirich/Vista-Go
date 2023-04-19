import { Box, InputAdornment, TextField } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import EastIcon from "@mui/icons-material/East";
import { useState } from "react";
import styles from "./SearchField.module.scss";

function SearchField() {
  const [value, setValue] = useState("");
  return (
    <Box>
      <TextField
        id="city"
        variant="standard"
        placeholder="Input destination"
        size="small"
        type="search"
        value={value}
        fullWidth
        onChange={(e) => setValue(e.target.value)}
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
