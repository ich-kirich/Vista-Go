import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddRecommend from "../AddRecommend/AddRecommend";
import DeleteRecommend from "../DeleteRecommend/DeleteRecommend";
import styles from "./RecommendsPanel.module.scss";

function RecommendsPanel() {
  const [visibleAddPanel, setVisibleAddPanel] = useState(false);
  const [visibleDeletePanel, setVisibleDeletePanel] = useState(false);

  const viewAddPanel = () => {
    setVisibleAddPanel(true);
    setVisibleDeletePanel(false);
  };

  const viewDeletePanel = () => {
    setVisibleDeletePanel(true);
    setVisibleAddPanel(false);
  };

  return (
    <Box className={styles.panel__wrapper}>
      <Box className={styles.controls__wrapper}>
        <Button variant="contained" fullWidth onClick={viewAddPanel}>
          Add recommend
        </Button>
        <Button variant="contained" fullWidth onClick={viewDeletePanel}>
          Delete recommend
        </Button>
      </Box>
      <Box>{visibleAddPanel && <AddRecommend />}</Box>
      <Box>{visibleDeletePanel && <DeleteRecommend />}</Box>
    </Box>
  );
}

export default RecommendsPanel;
