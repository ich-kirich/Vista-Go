import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import ControlPanel from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AppRouter />
        <ControlPanel />
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
