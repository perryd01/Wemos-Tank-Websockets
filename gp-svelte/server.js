// server.js
const WebSocket = require("ws");
const PORT = 8080;

const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("Client connected");

  // Send a welcome message to the client
  socket.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));

  // Handle messages received from the client
  socket.on("message", (data) => {
    console.log(data);

    // Send a response back to the client
    socket.send(
      JSON.stringify({
        message: `Hello from server! Received: ${data}`,
      })
    );
  });

  // Handle client disconnect
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);