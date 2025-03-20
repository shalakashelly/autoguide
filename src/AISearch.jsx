import React, { useState, useEffect, useRef } from "react";
import { Container, Paper } from "@mui/material";
import Box from "@digital-hig/mui/Box";
import Button from "@digital-hig/mui/Button";
import Input from "@digital-hig/mui/Input";
import Typography from "@digital-hig/mui/Typography";

const AISearch = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isBoxExpanded, setIsBoxExpanded] = useState(false);
  const conversationEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!query.trim()) return;

    const newMessage = { user: query, ai: "Thinking..." };
    setConversation((prev) => [...prev, newMessage]);

    // After the first message, expand the box
    if (!isBoxExpanded) {
      setIsBoxExpanded(true);
    }

    setTimeout(() => {
      const aiResponse = `AI response for: ${query}`;
      setConversation((prev) => {
        // Only update the last message if it exists
        if (prev.length > 0) {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].ai = aiResponse;
          return updatedMessages;
        }
        return prev; // If no messages, return prev unchanged
      });
    }, 1500);

    setQuery("");
  };

  const handleClearChat = () => {
    setConversation([]);
    setIsBoxExpanded(false); // Reset box height after clearing chat
  };

  // Scroll to the bottom when the conversation changes
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]); // Runs every time the conversation changes

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ margin: "20px 0" }}
      >
        Design and make anything with Autodesk software
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Typography variant="h6">
            What would you like to design and make today?
          </Typography>

          {/* Conditionally render the Clear Chat button */}
          {conversation.length > 0 && (
            <Button onClick={handleClearChat} variant="outlined" size="small">
              Clear Chat
            </Button>
          )}
        </Box>

        {/* Scrollable conversation box */}
        <Box
          sx={{
            mt: 2,
            maxHeight: isBoxExpanded ? "400px" : 300, // Expand box on first message
            overflowY: "auto",
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            position: "relative", // Positioning context for Clear Chat button
            mb: 2, // Adding space to separate the conversation from the input area
          }}
        >
          {conversation.map((msg, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  bgcolor: "#37474F",
                  p: 1,
                  borderRadius: "8px 0px 8px 8px",
                  width: "fit-content",
                  alignSelf: "flex-end",
                }}
              >
                {msg.user}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  bgcolor: "#ECEFF1",
                  p: 1,
                  borderRadius: "0px 8px 8px 8px",
                  width: "fit-content",
                  alignSelf: "flex-start",
                }}
              >
                {msg.ai}
              </Typography>
            </Box>
          ))}
          {/* This is the scroll target to always bring the scroll to the bottom */}
          <div ref={conversationEndRef} />
        </Box>

        {/* Input and send button area */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Input
            fullWidth
            placeholder="Describe your project..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                handleSendMessage();
              }
            }}
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={!query.trim()} // Disable if query is empty
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AISearch;
