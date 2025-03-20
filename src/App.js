import { themeLight } from "@digital-hig/mui/Theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AISearch from "./AISearch";

function App() {
  return (
    <ThemeProvider theme={createTheme(themeLight)}>
      <div className="App">
        <AISearch />
      </div>
    </ThemeProvider>
  );
}

export default App;
