import { Box, Typography, TextField, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import FetchWrapper from "../FetchWrapper/FetchWrapper";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./AddGuide.module.scss";

function AddGuide() {
  const [isClick, setIsClick] = useState(false);
  const [nameGuide, setNameGuide] = useState("");
  const [imageGuide, setImageGuide] = useState<File>();

  const { fetchCreateGuide } = useActions();
  const { error, loading } = useTypedSelector((state) => state.guide);

  const newNameGuide = (value: string) => {
    setNameGuide(value);
  };

  const addGuide = () => {
    setIsClick(true);
    fetchCreateGuide(nameGuide, imageGuide!);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageGuide(file);
  };

  return (
    <Box className={styles.controls__wrapper}>
      <Typography variant="h6" component="h2">
        Enter a name for the guide:
      </Typography>
      <TextField
        label="Enter name"
        type="text"
        value={nameGuide}
        onChange={(e) => newNameGuide(e.target.value)}
        required
        fullWidth
      />
      <Typography variant="h6" component="h2">
        Enter a image for the guide:
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        id="file-upload"
        className={styles.image__upload}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={addGuide}
        disabled={!imageGuide || !nameGuide}
      >
        Add Guide
      </Button>
      {isClick && (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            The guide was successfully added
          </Typography>
        </FetchWrapper>
      )}
    </Box>
  );
}

export default AddGuide;
