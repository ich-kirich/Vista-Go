import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./AddTag.module.scss";

function AddTag() {
  const [isClick, setIsClick] = useState(false);
  const [nameTag, setNameTag] = useState("");

  const { fetchAddTag } = useActions();
  const { error, loading } = useTypedSelector((state) => state.tag);

  const newNameTag = (value: string) => {
    setNameTag(value);
  };

  const addTag = () => {
    setIsClick(true);
    fetchAddTag(nameTag);
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            The tag was successfully added
          </Typography>
        </FetchWrapper>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
}

export default AddTag;
