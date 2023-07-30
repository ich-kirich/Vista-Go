import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import FetchWrapper from "../FetchWrapper/FetchWrapper";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function DeleteSight() {
  const [chooseSight, setChooseSight] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchAllSights, fetchDeleteSight } = useActions();
  const sight = useTypedSelector((state) => state.sight);
  useEffect(() => {
    fetchAllSights();
  }, [sight.loading]);
  const { sights, error, loading } = useTypedSelector((state) => state.sights);

  const selectSight = (value: string) => {
    setChooseSight(value);
  };

  const deleteSight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchDeleteSight(Number(chooseSight));
  };

  return (
    <FetchWrapper loading={loading} error={error}>
      <Typography variant="h6" component="h2">
        Select a sight for deleting:
      </Typography>
      <NativeSelect
        value={chooseSight}
        onChange={(e) => selectSight(e.target.value)}
        variant="standard"
      >
        <option value="">Select</option>
        {sights.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </NativeSelect>
      <Button variant="contained" fullWidth onClick={deleteSight}>
        Delete Sight
      </Button>
      {isClick && (
        <FetchWrapper loading={sight.loading} error={sight.error}>
          <Typography variant="h6" component="h5">
            The sight was successfully deleted
          </Typography>
        </FetchWrapper>
      )}
    </FetchWrapper>
  );
}

export default DeleteSight;
