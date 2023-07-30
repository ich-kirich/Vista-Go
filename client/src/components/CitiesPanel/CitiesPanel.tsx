import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddCity from "../AddCity/AddCity";
import DeleteCity from "../DeleteCity/DeleteCity.tsx";
import UpdateCity from "../UpdateCity/UpdateCity";
import styles from "./CitiesPanel.module.scss";

function CitiesPanel() {
  const [visibleAddPanel, setVisibleAddPanel] = useState(false);
  const [visibleDeletePanel, setVisibleDeletePanel] = useState(false);
  const [visibleUpdatePanel, setVisibleUpdatePanel] = useState(false);

  const viewAddPanel = () => {
    setVisibleAddPanel(true);
    setVisibleDeletePanel(false);
    setVisibleUpdatePanel(false);
  };

  const viewDeletePanel = () => {
    setVisibleDeletePanel(true);
    setVisibleAddPanel(false);
    setVisibleUpdatePanel(false);
  };

  const viewUpdatePanel = () => {
    setVisibleUpdatePanel(true);
    setVisibleDeletePanel(false);
    setVisibleAddPanel(false);
  };

  return (
    <Box className={styles.panel__wrapper}>
      <Box className={styles.controls__wrapper}>
        <Button variant="contained" fullWidth onClick={viewAddPanel}>
          Add City
        </Button>
        <Button variant="contained" fullWidth onClick={viewUpdatePanel}>
          Update City
        </Button>
        <Button variant="contained" fullWidth onClick={viewDeletePanel}>
          Delete City
        </Button>
      </Box>
      <Box>{visibleAddPanel && <AddCity />}</Box>
      <Box>{visibleDeletePanel && <DeleteCity />}</Box>
      <Box>{visibleUpdatePanel && <UpdateCity />}</Box>
    </Box>
  );
}

export default CitiesPanel;
