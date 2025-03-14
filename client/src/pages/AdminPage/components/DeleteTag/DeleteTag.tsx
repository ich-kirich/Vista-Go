import { Box, Typography, NativeSelect, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";

function DeleteTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchTags, fetchDeleteTag } = useActions();
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
    fetchDeleteTag(Number(chooseTag));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Typography variant="h6" component="h2">
        Select a tag for deleting:
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
      <Button variant="contained" fullWidth onClick={deleteTag}>
        Delete Tag
      </Button>
      {isClick && (
        <FetchWrapper loading={tag.loading} error={tag.error}>
          <Typography variant="h6" component="h5">
            The tag was successfully deleted
          </Typography>
        </FetchWrapper>
      )}
    </FetchWrapper>
  );
}

export default DeleteTag;
