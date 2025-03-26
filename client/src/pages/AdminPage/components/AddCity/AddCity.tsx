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
import styles from "./AddCity.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";
import { validateLat, validateLon, validateName } from "../../../../libs/utils";

function AddCity() {
  const [isClick, setIsClick] = useState(false);
  const [countryCity, setCountryCity] = useState("");
  const [nameCity, setNameCity] = useState("");
  const [latCity, setLatCity] = useState("");
  const [lonCity, setLonCity] = useState("");
  const [sightIdsCity, setSightIdsCity] = useState<number[]>([]);
  const [numberSights, setNumberSights] = useState<number[]>([]);
  const [guideIdsCity, setGuideIdsCity] = useState<number[]>([]);
  const [numberGuides, setNumberGuides] = useState<number[]>([]);
  const [imageCity, setImageCity] = useState<File>();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string | null;
  }>({});

  const { fetchCreateCity, fetchAllSights, fetchGuides } = useActions();
  const { sights, error, loading } = useTypedSelector((state) => state.sights);
  const city = useTypedSelector((state) => state.city);
  const guides = useTypedSelector((state) => state.guides);

  const newNameCity = (value: string) => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, nameCity: error }));
    setNameCity(value);
  };

  const newCountryCity = (value: string) => {
    const error = validateName(value);
    setValidationErrors((prev) => ({ ...prev, countryCity: error }));
    setCountryCity(value);
  };

  const newLatCity = (value: string) => {
    const error = validateLat(value);
    setValidationErrors((prev) => ({ ...prev, latCity: error }));
    setLatCity(value);
  };

  const newLonCity = (value: string) => {
    const error = validateLon(value);
    setValidationErrors((prev) => ({ ...prev, lonCity: error }));
    setLonCity(value);
  };

  const addCity = () => {
    setIsClick(true);
    fetchCreateCity({
      country: countryCity,
      name: nameCity,
      lat: latCity,
      lon: lonCity,
      sightIds: sightIdsCity,
      guideIds: guideIdsCity,
      image: imageCity!,
    });
  };

  const addSight = () => {
    setNumberSights([...numberSights, numberSights.length + 1]);
    fetchAllSights();
  };

  const addGuide = () => {
    setNumberGuides([...numberGuides, numberGuides.length + 1]);
    fetchGuides();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageCity(file);
  };

  const selectSight = (value: string) => {
    if (sightIdsCity.includes(Number(value))) {
      setSightIdsCity(sightIdsCity.filter((item) => item !== Number(value)));
    } else {
      setSightIdsCity([...sightIdsCity, Number(value)]);
    }
  };

  const selectGuide = (value: string) => {
    if (guideIdsCity.includes(Number(value))) {
      setGuideIdsCity(guideIdsCity.filter((item) => item !== Number(value)));
    } else {
      setGuideIdsCity([...guideIdsCity, Number(value)]);
    }
  };

  const deleteGuideSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (guideIdsCity.includes(Number(idBlock))) {
      setGuideIdsCity(guideIdsCity.filter((item) => item !== Number(idBlock)));
      setNumberGuides((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    } else {
      setGuideIdsCity([...guideIdsCity, Number(idBlock)]);
    }
  };

  const deleteSightsSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sightIdsCity.includes(Number(idBlock))) {
      setSightIdsCity(sightIdsCity.filter((item) => item !== Number(idBlock)));
      setNumberSights((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    } else {
      setSightIdsCity([...sightIdsCity, Number(idBlock)]);
    }
  };

  return (
    <Box className={styles.controls__wrapper}>
      {isClick ? (
        <FetchWrapper loading={city.loading} error={city.error}>
          <Typography variant="h6" component="h5">
            The city was successfully added
          </Typography>
        </FetchWrapper>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            Enter a name for the city:
          </Typography>
          <TextField
            label="Enter name"
            type="text"
            value={nameCity}
            onChange={(e) => newNameCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.nameCity}
            helperText={validationErrors.nameCity}
          />
          <Typography variant="h6" component="h2">
            Enter a country for the city:
          </Typography>
          <TextField
            label="Enter country"
            type="text"
            value={countryCity}
            onChange={(e) => newCountryCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.countryCity}
            helperText={validationErrors.countryCity}
          />
          <Typography variant="h6" component="h2">
            Enter a lat of city:
          </Typography>
          <TextField
            label="Enter lat"
            type="text"
            value={latCity}
            onChange={(e) => newLatCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.latCity}
            helperText={validationErrors.latCity}
          />
          <Typography variant="h6" component="h2">
            Enter a lon of city:
          </Typography>
          <TextField
            label="Enter lon"
            type="text"
            value={lonCity}
            onChange={(e) => newLonCity(e.target.value)}
            required
            fullWidth
            error={!!validationErrors.lonCity}
            helperText={validationErrors.lonCity}
          />
          <Typography variant="h6" component="h2">
            Enter a image for the city:
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            id="file-upload"
            className={styles.image__upload}
          />
          <Button variant="text" fullWidth onClick={addSight}>
            Add sight for city
          </Button>
          <FetchWrapper loading={loading} error={error}>
            {numberSights.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={sightIdsCity[elem - 1]}
                  onChange={(e) => selectSight(e.target.value)}
                  variant="standard"
                >
                  <option value="">Select</option>
                  {sights &&
                    sights.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={sightIdsCity.includes(item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                </NativeSelect>
                <CloseIcon
                  className={styles.select__delete}
                  onClick={(e) => deleteSightsSelect(elem, e)}
                />
              </Box>
            ))}
          </FetchWrapper>
          <Button variant="text" fullWidth onClick={addGuide}>
            Add guide for city
          </Button>
          <FetchWrapper loading={guides.loading} error={guides.error}>
            {numberGuides.map((elem) => (
              <Box key={elem}>
                <NativeSelect
                  value={guideIdsCity[elem - 1]}
                  onChange={(e) => selectGuide(e.target.value)}
                  variant="standard"
                >
                  <option value="">Select</option>
                  {guides.guides &&
                    guides.guides.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        disabled={guideIdsCity.includes(item.id)}
                      >
                        {item.name}
                      </option>
                    ))}
                </NativeSelect>
                <CloseIcon
                  className={styles.select__delete}
                  onClick={(e) => deleteGuideSelect(elem, e)}
                />
              </Box>
            ))}
          </FetchWrapper>
          <Button
            variant="contained"
            fullWidth
            onClick={addCity}
            disabled={
              !imageCity ||
              !nameCity ||
              !countryCity ||
              !latCity ||
              !lonCity ||
              sightIdsCity.length === 0 ||
              guideIdsCity.length === 0
            }
          >
            Add City
          </Button>
        </>
      )}
    </Box>
  );
}

export default AddCity;
