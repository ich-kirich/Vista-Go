import {
  Box,
  Typography,
  TextField,
  Button,
  NativeSelect,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";
import styles from "./AddCity.module.scss";

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

  const { fetchCreateCity, fetchAllSights, fetchGuides } = useActions();
  const { sights, error, loading } = useTypedSelector((state) => state.sights);
  const city = useTypedSelector((state) => state.city);
  const guides = useTypedSelector((state) => state.guides);

  const newNameCity = (value: string) => {
    setNameCity(value);
  };

  const newCountryCity = (value: string) => {
    setCountryCity(value);
  };

  const newLatCity = (value: string) => {
    setLatCity(value);
  };

  const newLonCity = (value: string) => {
    setLonCity(value);
  };

  const addCity = () => {
    setIsClick(true);
    fetchCreateCity(
      countryCity,
      nameCity,
      latCity,
      lonCity,
      sightIdsCity,
      guideIdsCity,
      imageCity!,
    );
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
      <Box>
        {loading ? (
          <Loader />
        ) : (
          <Box>
            {error ? (
              <ViewError>{error}</ViewError>
            ) : (
              <Box>
                {numberSights.map((elem) => (
                  <Box key={elem}>
                    <NativeSelect
                      value={sightIdsCity[elem - 1]}
                      onChange={(e) => selectSight(e.target.value)}
                      variant="standard"
                    >
                      <option value="">Select</option>
                      {sights.map((item) => (
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
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Button variant="text" fullWidth onClick={addGuide}>
        Add guide for city
      </Button>
      <Box>
        {guides.loading ? (
          <Loader />
        ) : (
          <Box>
            {guides.error ? (
              <ViewError>{guides.error}</ViewError>
            ) : (
              <Box>
                {numberGuides.map((elem) => (
                  <Box key={elem}>
                    <NativeSelect
                      value={guideIdsCity[elem - 1]}
                      onChange={(e) => selectGuide(e.target.value)}
                      variant="standard"
                    >
                      <option value="">Select</option>
                      {guides.guides.map((item) => (
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
              </Box>
            )}
          </Box>
        )}
      </Box>
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
      {isClick && (
        <Box>
          {city.loading ? (
            <Loader />
          ) : (
            <Box>
              {city.error ? (
                <ViewError>{city.error}</ViewError>
              ) : (
                <Typography variant="h6" component="h5">
                  The city was successfully added
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default AddCity;
