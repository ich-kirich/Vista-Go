import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddGuide from "../AddGuide/AddGuide";
import DeleteGuide from "../DeleteGuide/DeleteGuide";
import UpdateGuide from "../UpdateGuide/UpdateGuide";
import styles from "./GuidesPanel.module.scss";

function GuidesPanel() {
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
          Add Guide
        </Button>
        <Button variant="contained" fullWidth onClick={viewUpdatePanel}>
          Update Guide
        </Button>
        <Button variant="contained" fullWidth onClick={viewDeletePanel}>
          Delete Guide
        </Button>
      </Box>
      <Box>{visibleAddPanel && <AddGuide />}</Box>
      <Box>{visibleDeletePanel && <DeleteGuide />}</Box>
      <Box>{visibleUpdatePanel && <UpdateGuide />}</Box>
    </Box>
  );
}

export default GuidesPanel;
