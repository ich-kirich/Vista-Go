import { Box } from "@mui/material";
import Loader from "../Loader/Loader";
import ViewError from "../ViewError/ViewError";

interface IFetchWrapper {
  children: React.ReactNode;
  loading: boolean;
  error: string | null;
}

function FetchWrapper({ children, loading, error }: IFetchWrapper) {
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
