import { themeLight } from "@digital-hig/mui/Theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AISearch from "./AISearch";
import { Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function App() {
  const light = createTheme(themeLight);

  return (
    <ThemeProvider theme={light}>
      <div className="App">
      <header className="App-header">
        <div className="header-overlay">
          <h1>Design and make anything with Autodesk software</h1>
        </div>
        <img
          className="App-header-image"
          src="https://damassets.autodesk.net/content/dam/autodesk/www/products/gateway/all/products-banner-1600x340.jpg"
          alt="Autodesk Banner"
        />
      </header>
        <AISearch />
        <Typography variant="headline-large" color="ink-on-background" sx={{ textAlign: "left", margin: "0 5%", padding: "10px 0" }}>All Products</Typography>
        <ProductCard /> 
      </div>
    </ThemeProvider>
  );
}

export default App;
