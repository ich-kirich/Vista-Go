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
import Loader from "../../../../components/Loader/Loader";
import ViewError from "../../../../components/ViewError/ViewError";
import styles from "./UpdateCity.module.scss";
import FetchWrapper from "../../../../components/FetchWrapper/FetchWrapper";

function UpdateCity() {
  const [isClick, setIsClick] = useState(false);
  const [chooseCity, setChooseCity] = useState("");
  const [countryCity, setCountryCity] = useState("");
  const [nameCity, setNameCity] = useState("");
  const [latCity, setLatCity] = useState("");
  const [lonCity, setLonCity] = useState("");
  const [sightIdsCity, setSightIdsCity] = useState<number[]>([]);
  const [numberSights, setNumberSights] = useState<number[]>([]);
  const [guideIdsCity, setGuideIdsCity] = useState<number[]>([]);
  const [numberGuides, setNumberGuides] = useState<number[]>([]);
  const [imageCity, setImageCity] = useState<File>();
  const cities = useTypedSelector((state) => state.cities);

  const city = useTypedSelector((state) => state.city);
  const { fetchAllSights, fetchCities, fetchUpdateCity, fetchGuides } =
    useActions();
  useEffect(() => {
    fetchAllSights();
  }, [city.loading]);
  useEffect(() => {
    fetchCities();
  }, []);
  useEffect(() => {
    const selectedCity = cities.cities.find(
      (elem) => elem.id === Number(chooseCity),
    );
    if (selectedCity) {
      const updatedSightIdsCity = selectedCity.sights.map((item) => item.id);
      setSightIdsCity(updatedSightIdsCity);
      setNumberSights(
        Array.from(
          { length: selectedCity.sights.length },
          (_, index) => index + 1,
        ),
      );
      const updatedGuideIdsCity = selectedCity.guides.map((item) => item.id);
      setGuideIdsCity(updatedGuideIdsCity);
      setNumberGuides(
        Array.from(
          { length: selectedCity.guides.length },
          (_, index) => index + 1,
        ),
      );
    }
  }, [chooseCity]);
  const { sights, error, loading } = useTypedSelector((state) => state.sights);
  const guides = useTypedSelector((state) => state.guides);

  const selectCity = (value: string) => {
    setChooseCity(value);
  };

  const updateCity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchUpdateCity({
      id: Number(chooseCity),
      country: countryCity,
      name: nameCity,
      lat: latCity,
      lon: lonCity,
      sightIds: sightIdsCity,
      guideIds: guideIdsCity,
      image: imageCity,
    });
  };

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

  const addSight = () => {
    setNumberSights([...numberSights, numberSights.length + 1]);
    setSightIdsCity([...sightIdsCity, sightIdsCity[numberSights.length]]);
    fetchAllSights();
  };

  const addGuide = () => {
    setNumberGuides([...numberGuides, numberGuides.length + 1]);
    setGuideIdsCity([...guideIdsCity, guideIdsCity[numberGuides.length]]);
    fetchGuides();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files![0];
    setImageCity(file);
  };

  const selectSight = (value: string, idBlock: number) => {
    if (sightIdsCity.includes(Number(value))) {
      setSightIdsCity(sightIdsCity.filter((item) => item !== Number(value)));
    } else {
      setSightIdsCity((prevState) => {
        const updatedArray = [...prevState];
        updatedArray[idBlock - 1] = Number(value);
        return updatedArray;
      });
    }
  };

  const deleteSightsSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sightIdsCity.includes(sightIdsCity[idBlock - 1])) {
      setSightIdsCity(
        sightIdsCity.filter((item) => item !== sightIdsCity[idBlock - 1]),
      );
      setNumberSights((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    }
  };

  const selectGuide = (value: string, idBlock: number) => {
    if (guideIdsCity.includes(Number(value))) {
      setGuideIdsCity(guideIdsCity.filter((item) => item !== Number(value)));
    } else {
      setGuideIdsCity((prevState) => {
        const updatedArray = [...prevState];
        updatedArray[idBlock - 1] = Number(value);
        return updatedArray;
      });
    }
  };

  const deleteGuideSelect = (idBlock: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (guideIdsCity.includes(guideIdsCity[idBlock - 1])) {
      setGuideIdsCity(
        guideIdsCity.filter((item) => item !== guideIdsCity[idBlock - 1]),
      );
      setNumberGuides((prevState) => {
        const updatedArray = [...prevState];
        updatedArray.pop();
        return updatedArray;
      });
    }
  };

  return (
    <FetchWrapper loading={cities.loading} error={cities.error}>
      <Box className={styles.controls__wrapper}>
        <Typography variant="h6" component="h2">
          Select a city for editing:
        </Typography>
        <NativeSelect
          value={chooseCity}
          onChange={(e) => selectCity(e.target.value)}
          variant="standard"
        >
          <option value="">Select</option>
          {cities.cities.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
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
        <FetchWrapper loading={loading} error={error}>
          {numberSights.map((elem) => (
            <Box key={elem}>
              <NativeSelect
                value={sightIdsCity[elem - 1]}
                onChange={(e) => selectSight(e.target.value, elem)}
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
        </FetchWrapper>
        <Button variant="text" fullWidth onClick={addGuide}>
          Add guide for city
        </Button>
        <FetchWrapper loading={guides.loading} error={guides.error}>
          {numberGuides.map((elem) => (
            <Box key={elem}>
              <NativeSelect
                value={guideIdsCity[elem - 1]}
                onChange={(e) => selectGuide(e.target.value, elem)}
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
        </FetchWrapper>
        <Button
          variant="contained"
          fullWidth
          onClick={updateCity}
          disabled={
            !imageCity &&
            !nameCity &&
            !countryCity &&
            !latCity &&
            !lonCity &&
            sightIdsCity.length === 0 &&
            guideIdsCity.length === 0
          }
        >
          Edit City
        </Button>
        {isClick && (
          <FetchWrapper loading={city.loading} error={city.error}>
            <Typography variant="h6" component="h5">
              The city was successfully edited
            </Typography>
          </FetchWrapper>
        )}
      </Box>
    </FetchWrapper>
  );
}

export default UpdateCity;
