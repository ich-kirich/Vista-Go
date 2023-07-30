import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import useTypedSelector from "./hooks/useTypedSelector";

function App() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <AppRouter />
        {isAuth && <ControlPanel />}
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
