import axios from "axios";

async function getCities() {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}`);
  return response;
}

export default getCities;
