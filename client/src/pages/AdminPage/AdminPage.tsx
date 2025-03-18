import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import styles from "./AdminPage.module.scss";
import AdminEntityPanel from "./components/AdminEntityPanel/AdminEntityPanel";
import AddCity from "./components/AddCity/AddCity";
import DeleteCity from "./components/DeleteCity/DeleteCity.tsx";
import DeleteGuide from "./components/DeleteGuide/DeleteGuide";
import DeleteRecommend from "./components/DeleteRecommend/DeleteRecommend";
import DeleteSight from "./components/DeleteSight/DeleteSight";
import DeleteTag from "./components/DeleteTag/DeleteTag";
import UpdateCity from "./components/UpdateCity/UpdateCity";
import UpdateGuide from "./components/UpdateGuide/UpdateGuide";
import UpdateSight from "./components/UpdateSight/UpdateSight";
import UpdateTag from "./components/UpdateTag/UpdateTag";
import AddGuide from "./components/AddGuide/AddGuide";
import AddRecommend from "./components/AddRecommend/AddRecommend";
import AddSight from "./components/AddSight/AddSight";
import AddTag from "./components/AddTag/AddTag";
import { ADMIN_ENTITY } from "../../libs/constants";

function AdminPage() {
  const [visiblePanel, setVisiblePanel] = useState<ADMIN_ENTITY | null>(null);

  const adminPanels = [
    {
      entity: ADMIN_ENTITY.CITY,
      label: "Edit cities",
      components: {
        add: <AddCity />,
        update: <UpdateCity />,
        delete: <DeleteCity />,
      },
    },
    {
      entity: ADMIN_ENTITY.RECOMMEND,
      label: "Edit recommends",
      components: { add: <AddRecommend />, delete: <DeleteRecommend /> },
    },
    {
      entity: ADMIN_ENTITY.SIGHT,
      label: "Edit sights",
      components: {
        add: <AddSight />,
        update: <UpdateSight />,
        delete: <DeleteSight />,
      },
    },
    {
      entity: ADMIN_ENTITY.TAG,
      label: "Edit tags of sights",
      components: {
        add: <AddTag />,
        update: <UpdateTag />,
        delete: <DeleteTag />,
      },
    },
    {
      entity: ADMIN_ENTITY.GUIDE,
      label: "Edit guides",
      components: {
        add: <AddGuide />,
        update: <UpdateGuide />,
        delete: <DeleteGuide />,
      },
    },
  ];

  return (
    <Box className={styles.panel__wrapper}>
      {adminPanels.map(({ entity, components }) => (
        <PopupComponent
          key={entity}
          visible={visiblePanel === entity}
          setVisible={() => setVisiblePanel(null)}
        >
          <AdminEntityPanel entity={entity} components={components} />
        </PopupComponent>
      ))}

      <Box>
        <Typography variant="h3" component="h2">
          Welcome to Admin Panel
        </Typography>
      </Box>

      <Box className={styles.controls__wrapper}>
        {adminPanels.map(({ entity, label }) => (
          <Button
            key={entity}
            variant="contained"
            fullWidth
            onClick={() => setVisiblePanel(entity)}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default AdminPage;
