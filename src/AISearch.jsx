import React, { useState, useEffect, useRef } from "react";
import Box from "@digital-hig/mui/Box";
import Button from "@digital-hig/mui/Button";
import Input from "@digital-hig/mui/Input";
import Typography from "@digital-hig/mui/Typography";

const WS_URL = "ws://localhost:8001/ws"; // WebSocket server URL

const AISearch = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isBoxExpanded, setIsBoxExpanded] = useState(true);
  const ws = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.current.onmessage = (event) => {
      try {
        const data = event.data;
        console.log("Received from WebSocket:", data);

        setConversation((prev) => {
          if (prev.length === 0) return prev; // Prevent empty updates

          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].ai =
            data || "No response";
          return updatedMessages;
        });
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected!");
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (
      !query.trim() ||
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN
    )
      return;

    const newMessage = { user: query, ai: "...." };
    setConversation((prev) => [...prev, newMessage]);

    if (!isBoxExpanded) {
      setIsBoxExpanded(true);
    }

    ws.current.send(JSON.stringify({ message: query })); // Ensure message is sent as JSON
    setQuery("");
  };

  const handleClearChat = () => {
    setConversation([]);
    setIsBoxExpanded(false);
  };

  return (
    <Box sx={{ margin: "2% 5%" }}>
      <Box
        sx={{
          p: 5,
          borderRadius: 2,
          border: "1px solid #ddd", // Adds a border
          boxShadow: 3, // Adds subtle shadow
          backgroundColor: "#fff",
        }}
      >
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
          {conversation.length > 0 && (
            <Button onClick={handleClearChat} variant="outlined" size="small">
              Clear Chat
            </Button>
          )}
        </Box>

        {/* Scrollable Conversation Box */}
        <Box
          sx={{
            mt: 2,
            maxHeight: "400px",
            overflowY: "auto",
            bgcolor: "#f5f5f5",
            borderRadius: 1,
            mb: 2,
          }}
          ref={scrollContainerRef}
        >
          {conversation.map((msg, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                gap: "15px",
              }}
            >
              {/* User Message */}
              <Typography
                variant="body-copy-medium"
                sx={{
                  color: "#fff",
                  bgcolor: "#37474F",
                  padding: "10px",
                  borderRadius: "8px 0px 8px 8px",
                  width: "fit-content",
                  alignSelf: "flex-end",
                  textAlign: "right",
                  maxWidth: "70%",
                }}
              >
                {msg.user}
              </Typography>

              {/* AI Response */}
              <Typography
                variant="body-copy-medium"
                sx={{
                  mt: 1,
                  bgcolor: "#ECEFF1",
                  padding: "10px",
                  borderRadius: "0px 8px 8px 8px",
                  width: "fit-content",
                  alignSelf: "flex-start",
                  textAlign: "left",
                  maxWidth: "70%",
                }}
              >
                {msg.ai}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Input and Send Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Input
            fullWidth
            placeholder="Ask anything..."
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
            disabled={!query.trim()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AISearch;
