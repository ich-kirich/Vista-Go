import { Box } from "@mui/material";
import { IFetchWrapper } from "../../types/types";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

function FetchWrapper(props: IFetchWrapper) {
  const { children, loading, error } = props;

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          {error ? <ViewError>{error}</ViewError> : <Box>{children}</Box>}
        </Box>
      )}
    </Box>
  );
}

export default FetchWrapper;
