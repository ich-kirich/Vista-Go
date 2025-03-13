import {
  Box,
  Typography,
  NativeSelect,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./UpdateTag.module.scss";

function UpdateTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchTags, fetchUpdateTag } = useActions();
  const tag = useTypedSelector((state) => state.tag);
  useEffect(() => {
    fetchTags();
  }, [tag.loading]);
  const { tags, error, loading } = useTypedSelector((state) => state.tags);

  const selectTag = (value: string) => {
    setChooseTag(value);
  };

  const deleteTag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateTag(Number(chooseTag), nameTag);
  };

  const newNameTag = (value: string) => {
    setNameTag(value);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Box className={styles.controls__wrapper}>
        <Typography variant="h6" component="h2">
          Select a tag for editing:
        </Typography>
        <NativeSelect
          value={chooseTag}
          onChange={(e) => selectTag(e.target.value)}
          variant="standard"
        >
          <option value="">Select</option>
          {tags.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
        <TextField
          label="Enter new name"
          type="text"
          value={nameTag}
          onChange={(e) => newNameTag(e.target.value)}
          required
          fullWidth
        />
        <Button variant="contained" fullWidth onClick={deleteTag}>
          Edit Tag
        </Button>
        {isClick && (
          <FetchWrapper loading={tag.loading} error={tag.error}>
            <Typography variant="h6" component="h5">
              The tag was successfully edited
            </Typography>
          </FetchWrapper>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default UpdateTag;
