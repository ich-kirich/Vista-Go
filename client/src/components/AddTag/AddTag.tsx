import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./AddTag.module.scss";

function AddTag() {
  const [isClick, setIsClick] = useState(false);
  const [nameTag, setNameTag] = useState("");

  const { fetchAddAdminTag } = useActions();
  const { error, loading } = useTypedSelector((state) => state.tag);

  const newNameTag = (value: string) => {
    setNameTag(value);
  };

  const addTag = () => {
    setIsClick(true);
    fetchAddAdminTag(nameTag);
  };

  return (
    <Box>
      {error ? (
        <ViewError>{error}</ViewError>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            Enter a name for the tag:
          </Typography>
          <TextField
            label="Enter name"
            type="text"
            value={nameTag}
            onChange={(e) => newNameTag(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" fullWidth onClick={addTag}>
            Add Tag
          </Button>
          {isClick && (
            <Box>
              {loading ? (
                <Loader />
              ) : (
                <Box>
                  {error ? (
                    <ViewError>{error}</ViewError>
                  ) : (
                    <Typography variant="h6" component="h5">
                      The tag was successfully added
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default AddTag;
