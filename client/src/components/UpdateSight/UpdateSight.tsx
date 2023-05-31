import {
  Box,
  Typography,
  NativeSelect,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import styles from "./UpdateSight.module.scss";
import FetchWrapper from "../FetchWrapper/FetchWrapper";

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

  const sight = useTypedSelector((state) => state.sight);
  const { fetchTags, fetchAllSights, fetchUpdateSight } = useActions();
  useEffect(() => {
    fetchTags();
  }, [sight.loading]);
  useEffect(() => {
    fetchAllSights();
  }, []);
  useEffect(() => {
    const selectedSight = sights.sights.find(
      (elem) => elem.id === Number(chooseSight),
    );
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
      <Box className={styles.controls__wrapper}>
        <Typography variant="h6" component="h2">
          Select a sight for editing:
        </Typography>
        <NativeSelect
          value={chooseSight}
          onChange={(e) => selectSight(e.target.value)}
          variant="standard"
        >
          <option value="">Select</option>
          {sights.sights.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
        <TextField
          label="Enter new name (optional)"
          type="text"
          value={nameSight}
          onChange={(e) => newNameSight(e.target.value)}
          required
          fullWidth
        />
        <Typography variant="h6" component="h2">
          Enter a description for the sight (optional):
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
          Enter a price for the sight (optional):
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
        <FetchWrapper loading={loading} error={error}>
          {numberTags.map((elem) => (
            <Box key={elem}>
              <NativeSelect
                value={tagIdsSight[elem - 1]}
                onChange={(e) => selectTag(e.target.value, elem)}
                variant="standard"
              >
                <option value="">Select</option>
                {tags.map((item) => (
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
          onClick={updateSight}
          disabled={
            !imageSight &&
            !nameSight &&
            !descriptionSight &&
            !priceSight &&
            !distanceSight &&
            tagIdsSight.length === 0
          }
        >
          Edit Sight
        </Button>
        {isClick && (
          <FetchWrapper loading={sight.loading} error={sight.error}>
            <Typography variant="h6" component="h5">
              The sight was successfully edited
            </Typography>
          </FetchWrapper>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default UpdateSight;
