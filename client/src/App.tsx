import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
