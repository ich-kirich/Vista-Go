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
import { useTranslation } from "react-i18next";

function UpdateTag() {
  const [chooseTag, setChooseTag] = useState("");
  const [nameTag, setNameTag] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { fetchTags, fetchUpdateTag } = useActions();
  const tag = useTypedSelector((state) => state.tag);
  useEffect(() => {
    fetchTags();
  }, [tag.loading]);
  const { tags, error, loading } = useTypedSelector((state) => state.tags);

  const selectTag = (value: string) => {
    setChooseTag(value);
  };

  const updateTag = (e: React.MouseEvent) => {
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
            {t("admin_page.update.tag.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.update.tag.select_label")}
          </Typography>
          <NativeSelect
            value={chooseTag}
            onChange={(e) => selectTag(e.target.value)}
            variant="standard"
          >
            {tags &&
              tags.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </NativeSelect>
          <TextField
            label={t("admin_page.update.tag.name")}
            type="text"
            value={nameTag}
            onChange={(e) => newNameTag(e.target.value)}
            required
            fullWidth
            error={!!validationError}
            helperText={validationError && t(`${validationError}`)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={updateTag}
            disabled={!!validationError || !nameTag}
          >
            {t("admin_page.update.tag.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateTag;
