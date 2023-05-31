import { Box, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IChangeUsernameProps } from "../../types/types";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./ChangeImage.module.scss";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import FetchWrapper from "../FetchWrapper/FetchWrapper";

function ChangeImage(props: IChangeUsernameProps) {
  const { visible, setVisible, userId } = props;
  const [displayError, setDisplayError] = useState(false);

  const { fetchUpdateUserImage } = useActions();
  const { error, loading } = useTypedSelector((state) => state.user);

  const closeNameField = () => {
    setVisible(!visible);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setDisplayError(true);
    fetchUpdateUserImage(userId!, file);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setDisplayError(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return (
    <Box>
      {visible && (
        <Box className={styles.input__wrapper}>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={closeNameField}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Box>{error && displayError && <ViewError>{error}</ViewError>}</Box>
      )}
    </Box>
  );
}

export default ChangeImage;
