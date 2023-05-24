import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import GuidesPanel from "../GuidesPanel/GuidesPanel";
import PopupComponent from "../PopupComponent/PopupComponent";
import RecommendsPanel from "../RecommendsPanel/RecommendsPanel";
import TagsPanel from "../TagsPanel/TagsPanel";
import styles from "./AdminPanel.module.scss";

function AdminPanel() {
  const [visibleRecommends, setVisibleRecommends] = useState(false);
  const [visibleTags, setVisibleTags] = useState(false);
  const [visibleGuides, setVisibleGuides] = useState(false);

  const viewRecommendsPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleRecommends(true);
  };

  const viewTagsPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleTags(true);
  };

  const viewGuidesPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisibleGuides(true);
  };

  return (
    <Box className={styles.panel__wrapper}>
      <PopupComponent
        visible={visibleRecommends}
        setVisible={setVisibleRecommends}
      >
        <RecommendsPanel />
      </PopupComponent>
      <PopupComponent visible={visibleTags} setVisible={setVisibleTags}>
        <TagsPanel />
      </PopupComponent>
      <PopupComponent visible={visibleGuides} setVisible={setVisibleGuides}>
        <GuidesPanel />
      </PopupComponent>
      <Box>
        <Typography variant="h3" component="h2">
          Welcome to Admin Panel
        </Typography>
      </Box>
      <Box className={styles.controls__wrapper}>
        <Button
          variant="contained"
          fullWidth
          onClick={(e) => viewRecommendsPanel(e)}
        >
          Edit cities
        </Button>
        <Button variant="contained" fullWidth onClick={viewRecommendsPanel}>
          Edit recommends
        </Button>
        <Button variant="contained" fullWidth onClick={viewRecommendsPanel}>
          Edit sights
        </Button>
        <Button variant="contained" fullWidth onClick={viewTagsPanel}>
          Edit tags of sights
        </Button>
        <Button variant="contained" fullWidth onClick={viewGuidesPanel}>
          Edit guides
        </Button>
      </Box>
    </Box>
  );
}

export default AdminPanel;
