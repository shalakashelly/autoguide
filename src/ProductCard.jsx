import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import Typography from "@digital-hig/mui/Typography";
import Button from "@digital-hig/mui/Button";
import Box from "@digital-hig/mui/Box";

const PRODUCT_API_URL =
  "https://cdn-delivery.autodesk.com/items/STG/fullitemcatalog.json";
const CHUNK_SIZE = 25;
const IMAGE_SIZE = 36;

const ProductCard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNextChunk = () => {
    const nextChunkStart = currentChunk * CHUNK_SIZE;
    const nextChunkEnd = nextChunkStart + CHUNK_SIZE;
    const nextProducts = allProducts.slice(nextChunkStart, nextChunkEnd);

    setDisplayedProducts((prev) => [...prev, ...nextProducts]);
    setCurrentChunk((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(PRODUCT_API_URL);
        const data = await response.json();
        if (data && Array.isArray(data)) {
        //   const sorted = [...data].sort((a, b) =>
        //     a.itemData?.itemName?.localeCompare(b.itemData?.itemName)
        //   );
          setAllProducts(data);
          setDisplayedProducts(data.slice(0, CHUNK_SIZE));
          setCurrentChunk(1);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {displayedProducts.map((product, i) => (
          <Card
            key={i}
            sx={{
              width: 280,
              height: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              alignItems: "center",
              padding: 2,
            }}
          >
            {product.itemData?.icons?.[0]?.url ? (
              <CardMedia
                component="img"
                image={product.itemData.icons[0].url}
                alt={product.itemData.itemName}
                sx={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  objectFit: "contain",
                  marginBottom: 2,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  bgcolor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <img
                  src="https://emsfs.autodesk.com/2023/BADGES/GENERIC_2023_BADGE_36x36.png"
                  alt="generic_image"
                  style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                />
              </Box>
            )}

            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {product.itemData.itemName}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ flexGrow: 1, mb: 2 }}
              >
                {product.extraData?.marketingName || "No description available"}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: "auto", width: "230px" }}
              >
                Add to cart
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: "10px", width: "230px" }}
              >
                Product Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {displayedProducts.length < allProducts.length && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={loadNextChunk}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;
