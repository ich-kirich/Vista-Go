import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../../../hooks/useActions";
import useTypedSelector from "../../../../hooks/useTypedSelector";
import styles from "./UpdateSight.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateName } from "../../../../libs/utils";
import { useTranslation } from "react-i18next";
import { Locales } from "../../../../libs/enums";

function UpdateSight() {
  const [chooseSight, setChooseSight] = useState("");
  const [nameSight, setNameSight] = useState("");
  const [descriptionSight, setDescriptionSight] = useState("");
  const [priceSight, setPriceSight] = useState("");
  const [distanceSight, setDistanceSight] = useState("");
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();
  const [isClick, setIsClick] = useState(false);
  const sights = useTypedSelector((state) => state.sights);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});
  const { t, i18n } = useTranslation();
  const language = i18n.language as Locales;

  const sight = useTypedSelector((state) => state.sight);
  const { fetchTags, fetchAllSights, fetchUpdateSight } = useActions();
  useEffect(() => {
    fetchTags();
  }, [sight.loading]);
  useEffect(() => {
    fetchAllSights();
  }, []);
  useEffect(() => {
    const selectedSight =
      sights.sights &&
      sights.sights.find((elem) => elem.id === Number(chooseSight));
    if (selectedSight) {
      const updatedTagIdsSight = selectedSight.tags.map((item) => item.id);
      setTagIdsSight(updatedTagIdsSight);
      setNumberTags(
        Array.from(
          { length: selectedSight.tags.length },
          (_, index) => index + 1,
        ),
      );
    }
  }, [chooseSight]);
  const { tags, error, loading } = useTypedSelector((state) => state.tags);

  const selectSight = (value: string) => {
    setChooseSight(value);
  };

  const updateSight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateSight({
      id: Number(chooseSight),
      name: nameSight,
      description: descriptionSight,
      price: priceSight,
      distance: distanceSight,
      tagIds: tagIdsSight,
      image: imageSight,
    });
  };

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

  const addTag = () => {
    setNumberTags([...numberTags, numberTags.length + 1]);
    setTagIdsSight([...tagIdsSight, tagIdsSight[numberTags.length]]);
    fetchTags();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageSight(file);
  };

  const selectTag = (value: string, idBlock: number) => {
    if (tagIdsSight.includes(Number(value))) {
      setTagIdsSight(tagIdsSight.filter((item) => item !== Number(value)));
    } else {
      setTagIdsSight((prevState) => {
        const updatedArray = [...prevState];
        updatedArray[idBlock - 1] = Number(value);
        return updatedArray;
      });
    }
  };

  const deleteBlocksSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tagIdsSight.includes(tagIdsSight[idBlock - 1])) {
      setTagIdsSight(
        tagIdsSight.filter((item) => item !== tagIdsSight[idBlock - 1]),
      );
      setNumberTags((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    }
  };

  return (
    <FetchWrapper loading={sights.loading} error={sights.error}>
      {isClick ? (
        <FetchWrapper loading={sight.loading} error={sight.error}>
          <Typography variant="h6" component="h5">
            {t("admin_page.update.sight.success")}
          </Typography>
        </FetchWrapper>
      ) : (
        <Box className={styles.controls__wrapper}>
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.select_label")}
          </Typography>
          <NativeSelect
            value={chooseSight}
            onChange={(e) => selectSight(e.target.value)}
            variant="standard"
          >
            {sights.sights &&
              sights.sights.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </NativeSelect>
          <TextField
            label={t("admin_page.update.sight.name")}
            type="text"
            value={nameSight}
            onChange={(e) => newNameSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.nameSight}
            helperText={
              validationErrors.nameSight && t(`${validationErrors.nameSight}`)
            }
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.description_label")}
          </Typography>
          <TextField
            label={t("admin_page.update.sight.description")}
            type="text"
            value={descriptionSight}
            onChange={(e) => newDescriptionSight(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.descriptionSight}
            helperText={
              validationErrors.descriptionSight &&
              t(`${validationErrors.descriptionSight}`)
            }
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.price_label")}
          </Typography>
          <TextField
            label={t("admin_page.update.sight.price")}
            type="text"
            value={priceSight}
            onChange={(e) => newPriceSight(e.target.value)}
            required
            fullWidth
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.distance_label")}
          </Typography>
          <TextField
            label={t("admin_page.update.sight.distance")}
            type="text"
            value={distanceSight}
            onChange={(e) => newDistanceSight(e.target.value)}
            required
            fullWidth
          />
          <Typography variant="h6" component="h2">
            {t("admin_page.update.sight.image_label")}
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Button variant="text" fullWidth onClick={addTag}>
            {t("admin_page.update.sight.tag_button")}
          </Button>
          <FetchWrapper loading={loading} error={error}>
            {numberTags.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={tagIdsSight[elem - 1]}
                  onChange={(e) => selectTag(e.target.value, elem)}
                  variant="standard"
                >
                  {tags &&
                    tags.map((item) => (
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
            onClick={updateSight}
            disabled={
              (!imageSight &&
                !nameSight &&
                !descriptionSight &&
                !priceSight &&
                !distanceSight &&
                tagIdsSight.length === 0) ||
              Object.values(validationErrors).some((error) => error !== null)
            }
          >
            {t("admin_page.update.sight.button")}
          </Button>
        </Box>
      )}
    </FetchWrapper>
  );
}

export default UpdateSight;
