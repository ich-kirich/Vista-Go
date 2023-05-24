import {
  Box,
  Typography,
  NativeSelect,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./UpdateTag.module.scss";

function UpdateTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchTags, fetchUpdateAdminTag } = useActions();
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
    fetchUpdateAdminTag(Number(chooseTag), nameTag);
  };

  const newNameTag = (value: string) => {
    setNameTag(value);
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
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
                <Box>
                  {tag.loading ? (
                    <Loader />
                  ) : (
                    <Box>
                      {tag.error ? (
                        <ViewError>{tag.error}</ViewError>
                      ) : (
                        <Typography variant="h6" component="h5">
                          The tag was successfully edited
                        </Typography>
                      )}
                    </Box>
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

export default UpdateTag;
