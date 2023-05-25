import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddSight from "../AddSight/AddSight";
import DeleteSight from "../DeleteSight/DeleteSight";
import UpdateSight from "../UpdateSight/UpdateSight";
import styles from "./SightsPanel.module.scss";

function SightsPanel() {
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
          Add Sight
        </Button>
        <Button variant="contained" fullWidth onClick={viewUpdatePanel}>
          Update Sight
        </Button>
        <Button variant="contained" fullWidth onClick={viewDeletePanel}>
          Delete Sight
        </Button>
      </Box>
      <Box>{visibleAddPanel && <AddSight />}</Box>
      <Box>{visibleDeletePanel && <DeleteSight />}</Box>
      <Box>{visibleUpdatePanel && <UpdateSight />}</Box>
    </Box>
  );
}

export default SightsPanel;
