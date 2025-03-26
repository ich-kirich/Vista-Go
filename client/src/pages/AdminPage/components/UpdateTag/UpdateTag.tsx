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
import { validateName } from "../../../../libs/utils";

function UpdateTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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
    const error = validateName(value);
    setValidationError(error);
    setNameTag(value);
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      {isClick ? (
        <FetchWrapper loading={tag.loading} error={tag.error}>
          <Typography variant="h6" component="h5">
            The tag was successfully edited
          </Typography>
        </FetchWrapper>
      ) : (
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
            {tags &&
              tags.map((item) => (
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
            error={!!validationError}
            helperText={validationError}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={deleteTag}
            disabled={!!validationError || !nameTag}
          >
            Edit Tag
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateTag;
