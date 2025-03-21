import React, { useState, useEffect } from "react";
import { Grid2, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import Typography from "@digital-hig/mui/Typography";
import Button from "@digital-hig/mui/Button";
import Box from "@digital-hig/mui/Box";

const PRODUCT_API_URL = "https://cdn-delivery.autodesk.com/items/STG/fullitemcatalog.json";
const MAX_PRODUCTS = 25; // Limit to 25 products

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProductData = async () => {
      try {
        const response = await fetch(PRODUCT_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data && Array.isArray(data)) {
          // Limit the product count to MAX_PRODUCTS
          setProducts(data.slice(0, MAX_PRODUCTS));
        } else {
          console.warn("Data format incorrect.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchProductData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={3}>
        {products.map((product, i) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={i}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
              {/* Product Image */}
              {product.itemData?.icons?.[0]?.url ? (
                <CardMedia
                  component="img"
                  height="100"
                  image={product.itemData.icons[0].url}
                  alt={product.itemData.itemName}
                  sx={{ objectFit: "contain", padding: "10px" }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100px",
                    bgcolor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="https://emsfs.autodesk.com/2023/BADGES/GENERIC_2023_BADGE_36x36.png" alt="generic_image" />
                </Box>
              )}

              {/* Product Content */}
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6">{product.itemData.itemName}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1, mb: 2 }}>
                  {product.extraData?.marketingName || "No description available"}
                </Typography>

                {/* Align "Add to cart" button at the bottom */}
                <Button variant="contained" color="primary" fullWidth sx={{ mt: "auto" }}>
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ProductCard;
