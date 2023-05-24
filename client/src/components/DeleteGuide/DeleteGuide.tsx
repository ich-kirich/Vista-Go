import { Box, Typography, NativeSelect, Button } from "@mui/material";
import { useState, useEffect } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function DeleteGuide() {
  const [chooseGuide, setChooseGuide] = useState("");
  const [isClick, setIsClick] = useState(false);

  const { fetchGuides, fetchDeleteGuide } = useActions();
  const guide = useTypedSelector((state) => state.guide);
  useEffect(() => {
    fetchGuides();
  }, [guide.loading]);
  const { guides, error, loading } = useTypedSelector((state) => state.guides);

  const selectTag = (value: string) => {
    setChooseGuide(value);
  };

  const deleteTag = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClick(true);
    fetchDeleteGuide(Number(chooseGuide));
  };

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? (
            <ViewError>{error}</ViewError>
          ) : (
            <Box>
              <Typography variant="h6" component="h2">
                Select a guide for deleting:
              </Typography>
              <NativeSelect
                value={chooseGuide}
                onChange={(e) => selectTag(e.target.value)}
                variant="standard"
              >
                {guides.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect>
              <Button variant="contained" fullWidth onClick={deleteTag}>
                Delete Tag
              </Button>
              {isClick && (
                <Box>
                  {guide.loading ? (
                    <Loader />
                  ) : (
                    <Box>
                      {guide.error ? (
                        <ViewError>{guide.error}</ViewError>
                      ) : (
                        <Typography variant="h6" component="h5">
                          The guide was successfully deleted
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default DeleteGuide;
