import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import FetchWrapper from "../FetchWrapper/FetchWrapper";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./UpdateGuide.module.scss";

function UpdateGuide() {
  const [chooseGuide, setChooseGuide] = useState("");
  const [nameGuide, setNameGuide] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [imageGuide, setImageGuide] = useState<File>();

  const { fetchGuides, fetchUpdateGuide } = useActions();
  const guide = useTypedSelector((state) => state.guide);
  useEffect(() => {
    fetchGuides();
  }, [guide.loading]);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  const selectGuide = (value: string) => {
    setChooseGuide(value);
  };

  const updateGuide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateGuide(Number(chooseGuide), nameGuide, imageGuide);
  };

  const newNameGuide = (value: string) => {
    setNameGuide(value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageGuide(file);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.controls__wrapper}>
        <Typography variant="h6" component="h2">
          Select a guide for editing:
        </Typography>
        <NativeSelect
          value={chooseGuide}
          onChange={(e) => selectGuide(e.target.value)}
          variant="standard"
        >
          <option value="">Select</option>
          {guides.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
        <TextField
          label="Enter new name (optional)"
          type="text"
          value={nameGuide}
          onChange={(e) => newNameGuide(e.target.value)}
          required
          fullWidth
        />
        <Typography variant="h6" component="h2">
          Enter a image for the guide (optional):
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
          onClick={updateGuide}
          disabled={!imageGuide && !nameGuide}
        >
          Edit Guide
        </Button>
        {isClick && (
          <FetchWrapper loading={guide.loading} error={guide.error}>
            <Typography variant="h6" component="h5">
              The guide was successfully edited
            </Typography>
          </FetchWrapper>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default UpdateGuide;
