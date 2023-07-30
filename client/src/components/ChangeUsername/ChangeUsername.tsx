import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IChangeUsernameProps } from "../../types/types";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./ChangeUsername.module.scss";

function ChangeUsername(props: IChangeUsernameProps) {
  const { visible, setVisible, userId } = props;
  const [newName, setNewName] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const { fetchUpdateUsername } = useActions();
  const { error, loading } = useTypedSelector((state) => state.user);

  const updateName = () => {
    setVisible(!visible);
    setDisplayError(true);
    fetchUpdateUsername(userId!, newName!);
  };

  const closeNameField = () => {
    setVisible(!visible);
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
          <TextField
            label="Enter your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            fullWidth
          />
          <Box className={styles.btns__wrapper}>
            <Button variant="contained" fullWidth onClick={updateName}>
              Save Name
            </Button>
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

export default ChangeUsername;
