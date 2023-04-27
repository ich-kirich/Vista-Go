import { StyledEngineProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "../store/store";
import MainPage from "@/components/MainPage/MainPage";

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <MainPage />
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
