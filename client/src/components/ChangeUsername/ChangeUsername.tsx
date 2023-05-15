import { Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IChangeUsernameProps } from "../../types/types";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function ChangeUsername(props: IChangeUsernameProps) {
  const { visible, setVisible, userId } = props;
  const [newName, setNewName] = useState("");

  const { fetchUpdateUsername } = useActions();
  const { error, loading } = useTypedSelector((state) => state.user);

  const viewNameField = () => {
    setVisible(!visible);
    fetchUpdateUsername(userId!, newName!);
  };

  return (
    <Box>
      {visible && (
        <Box>
          <TextField
            label="Enter your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" fullWidth onClick={viewNameField}>
            Save Name
          </Button>
          <Button variant="contained" fullWidth onClick={viewNameField}>
            Cancel
          </Button>
        </Box>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Box>{error && <ViewError>{error}</ViewError>}</Box>
      )}
    </Box>
  );
}

export default ChangeUsername;
