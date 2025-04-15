import { Box, Typography, NativeSelect, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function DeleteTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [isClick, setIsClick] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

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
      {isClick ? (
        <FetchWrapper loading={tag.loading} error={tag.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.delete.tag.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.delete.tag.select_label")}:
          </Typography>
          <NativeSelect
            value={chooseTag}
            onChange={(e) => selectTag(e.target.value)}
            variant="standard"
          >
            {tags &&
              tags.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name[language] || item.name.en}
                </option>
              ))}
          </NativeSelect>
          <Button variant="contained" fullWidth onClick={deleteTag}>
            {t("admin_page.delete.tag.button")}
          </Button>
        </>
      )}
    </FetchWrapper>
  );
}

export default DeleteTag;
