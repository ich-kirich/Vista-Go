import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import styles from "./AddTag.module.scss";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";

function AddTag() {
  const [isClick, setIsClick] = useState(false);
  const [nameTag, setNameTag] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { t } = useTranslation();

  const { fetchAddTag } = useActions();
  const { error, loading } = useTypedSelector((state) => state.tag);

  const newNameTag = (value: string) => {
    const error = validateName(value);
    setValidationError(error);
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
            {t("admin_page.add.tag.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            {t("admin_page.add.tag.name_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.tag.name")}
            type="text"
            value={nameTag}
            onChange={(e) => newNameTag(e.target.value)}
            required
            fullWidth
            error={!!validationError}
            helperText={validationError && t(validationError)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={addTag}
            disabled={!!validationError || !nameTag}
          >
            {t("admin_page.add.tag")}
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddTag;
