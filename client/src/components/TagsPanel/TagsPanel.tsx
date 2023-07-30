import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddTag from "../AddTag/AddTag";
import DeleteTag from "../DeleteTag/DeleteTag";
import UpdateTag from "../UpdateTag/UpdateTag";
import styles from "./TagsPanel.module.scss";

function TagsPanel() {
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
          Add tag
        </Button>
        <Button variant="contained" fullWidth onClick={viewUpdatePanel}>
          Update tag
        </Button>
        <Button variant="contained" fullWidth onClick={viewDeletePanel}>
          Delete tag
        </Button>
      </Box>
      <Box>{visibleAddPanel && <AddTag />}</Box>
      <Box>{visibleDeletePanel && <DeleteTag />}</Box>
      <Box>{visibleUpdatePanel && <UpdateTag />}</Box>
    </Box>
  );
}

export default TagsPanel;
