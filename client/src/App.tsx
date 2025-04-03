import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter/AppRouter";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import useTypedSelector from "./hooks/useTypedSelector";
import i18n from "./locales/i18";
import { I18nextProvider } from "react-i18next";

document.documentElement.lang = i18n.language;

const updatePageMetadata = () => {
  document.title = i18n.t("page_title");
  document.documentElement.lang = i18n.language;
};

i18n.on("languageChanged", updatePageMetadata);

function App() {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <AppRouter />
          {isAuth && <ControlPanel />}
        </I18nextProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  );
}

export default App;
