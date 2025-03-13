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

function AddSight() {
  const [isClick, setIsClick] = useState(false);
  const [nameSight, setNameSight] = useState("");
  const [descriptionSight, setDescriptionSight] = useState("");
  const [priceSight, setPriceSight] = useState("");
  const [distanceSight, setDistanceSight] = useState("");
  const [tagIdsSight, setTagIdsSight] = useState<number[]>([]);
  const [numberTags, setNumberTags] = useState<number[]>([]);
  const [imageSight, setImageSight] = useState<File>();

  const { fetchCreateSight, fetchTags } = useActions();
  const { error, loading } = useTypedSelector((state) => state.sight);
  const tags = useTypedSelector((state) => state.tags);

  const newNameSight = (value: string) => {
    setNameSight(value);
  };

  const newDescriptionSight = (value: string) => {
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
    <Box className={styles.controls__wrapper}>
      <Typography variant="h6" component="h2">
        Enter a name for the sight:
      </Typography>
      <TextField
        label="Enter name"
        type="text"
        value={nameSight}
        onChange={(e) => newNameSight(e.target.value)}
        required
        fullWidth
      />
      <Typography variant="h6" component="h2">
        Enter a description for the sight:
      </Typography>
      <TextField
        label="Enter description"
        type="text"
        value={descriptionSight}
        onChange={(e) => newDescriptionSight(e.target.value)}
        required
        fullWidth
      />
      <Typography variant="h6" component="h2">
        Enter a price for the sight:
      </Typography>
      <TextField
        label="Enter price"
        type="text"
        value={priceSight}
        onChange={(e) => newPriceSight(e.target.value)}
        required
        fullWidth
      />
      <Typography variant="h6" component="h2">
        Enter a distance for the sight:
      </Typography>
      <TextField
        label="Enter distance"
        type="text"
        value={distanceSight}
        onChange={(e) => newDistanceSight(e.target.value)}
        required
        fullWidth
      />
      <Typography variant="h6" component="h2">
        Enter a image for the sight:
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        id="file-upload"
        className={styles.image__upload}
      />
      <Button variant="text" fullWidth onClick={addTag}>
        Add tag for sight
      </Button>
      <FetchWrapper loading={tags.loading} error={tags.error}>
        {numberTags.map((elem) => (
          <Box key={elem}>
            <NativeSelect
              value={tagIdsSight[elem - 1]}
              onChange={(e) => selectTag(e.target.value, elem)}
              variant="standard"
            >
              <option value="">Select</option>
              {tags.tags.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  disabled={tagIdsSight.includes(item.id)}
                >
                  {item.name}
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
          tagIdsSight.length === 0
        }
      >
        Add sight
      </Button>
      {isClick && (
        <FetchWrapper loading={loading} error={error}>
          <Typography variant="h6" component="h5">
            The sight was successfully added
          </Typography>
        </FetchWrapper>
      )}
    </Box>
  );
}

export default AddSight;
