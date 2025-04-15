import {
  Box,
  Typography,
  TextField,
  Button,
  NativeSelect,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./AddSight.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function AddSight() {
  const [isClick, setIsClick] = useState(false);
  const [nameSight, setNameSight] = useState("");
  const [descriptionSight, setDescriptionSight] = useState("");
  const [priceSight, setPriceSight] = useState("");
  const [distanceSight, setDistanceSight] = useState("");
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const { fetchCreateSight, fetchTags } = useActions();
  const { error, loading } = useTypedSelector((state) => state.sight);
  const tags = useTypedSelector((state) => state.tags);

  const newNameSight = (value: string) => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, nameSight: error }));
    setNameSight(value);
  };

  const newDescriptionSight = (value: string) => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, descriptionSight: error }));
    setDescriptionSight(value);
  };

  const newPriceSight = (value: string) => {
    setPriceSight(value);
  };

  const newDistanceSight = (value: string) => {
    setDistanceSight(value);
  };

  const addSight = () => {
    setIsClick(true);
    fetchCreateSight({
      name: nameSight,
      description: descriptionSight,
      price: priceSight,
      distance: distanceSight,
      tagIds: tagIdsSight,
      image: imageSight!,
    });
  };

  const addTag = () => {
    setNumberTags([...numberTags, numberTags.length + 1]);
    fetchTags();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageSight(file);
  };

  const selectTag = (value: string, selectId: number) => {
    if (tagIdsSight.includes(Number(value))) {
      setTagIdsSight(tagIdsSight.filter((item) => item !== Number(value)));
    } else {
      setTagIdsSight([...tagIdsSight, Number(value)]);
    }
  };

  const deleteBlocksSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tagIdsSight.includes(Number(idBlock))) {
      setTagIdsSight(tagIdsSight.filter((item) => item !== Number(idBlock)));
      setNumberTags((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    } else {
      setTagIdsSight([...tagIdsSight, Number(idBlock)]);
    }
  };

  return (
    <>
      {isClick ? (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.add.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.add.sight.name_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.sight.name")}
            type="text"
            value={nameSight}
            onChange={(e) => newNameSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.nameSight}
            helperText={
              validationErrors.nameSight && t(validationErrors.nameSight)
            }
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.add.sight.description_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.sight.description")}
            type="text"
            value={descriptionSight}
            onChange={(e) => newDescriptionSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.descriptionSight}
            helperText={
              validationErrors.descriptionSight &&
              t(validationErrors.descriptionSight)
            }
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.add.sight.price_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.sight.price")}
            type="text"
            value={priceSight}
            onChange={(e) => newPriceSight(e.target.value)}
            required
            fullWidth
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.add.sight.distance_label")}:
          </Typography>
          <TextField
            label={t("admin_page.add.sight.distance")}
            type="text"
            value={distanceSight}
            onChange={(e) => newDistanceSight(e.target.value)}
            required
            fullWidth
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.add.sight.image_label")}:
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Button variant="text" fullWidth onClick={addTag}>
            {t("admin_page.add.sight.tag_button")}
          </Button>
          <FetchWrapper loading={tags.loading} error={tags.error}>
            {numberTags.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={tagIdsSight[elem - 1]}
                  onChange={(e) => selectTag(e.target.value, elem)}
                  variant="standard"
                >
                  {tags.tags &&
                    tags.tags.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={tagIdsSight.includes(item.id)}
                      >
                        {item.name[language] || item.name.en}
                      </option>
                    ))}
                </NativeSelect>
                <CloseIcon
                  className={styles.select__delete}
                  onClick={(e) => deleteBlocksSelect(elem, e)}
                />
              </Box>
            ))}
          </FetchWrapper>
          <Button
            variant="contained"
            fullWidth
            onClick={addSight}
            disabled={
              !imageSight ||
              !nameSight ||
              !descriptionSight ||
              !priceSight ||
              !distanceSight ||
              tagIdsSight.length === 0 ||
              Object.values(validationErrors).some((error) => error !== null)
            }
          >
            {t("admin_page.add.sight")}
          </Button>
        </Box>
      )}
    </>
  );
}

export default AddSight;
