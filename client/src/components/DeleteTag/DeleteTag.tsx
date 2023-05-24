import { Box, Typography, NativeSelect, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function DeleteTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchTags, fetchDeleteAdminTag } = useActions();
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
    fetchDeleteAdminTag(Number(chooseTag));
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
            <Box>
              <Typography variant="h6" component="h2">
                Select a tag for deleting:
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
              <Button variant="contained" fullWidth onClick={deleteTag}>
                Delete Tag
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
                          The tag was successfully deleted
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

export default DeleteTag;
