const DISPLAY_TITLE_EVENT = "displayTitleEvent"; // Name of the event
const DISPLAY_SELECTION_EVENT = "displaySelectionEvent"; // Name of the event
const DISPLAY_ANSWER_CHECK_EVENT = "displayAnswerCheckEvent"; // Name of the event
const DISPLAY_ANSWER_EVENT = "displayAnswerEvent"; // Name of the event

const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

io.on("connection", (socket) => {
  
  // Join a conversation
//   const { roomId } = socket.handshake.query;
    // socket.join('test');
    console.log(`connection:`+socket.id);

  // Listen for new messages
  socket.on(DISPLAY_TITLE_EVENT, (data) => {
      console.log('socket-server:');
      console.log('data:'+data);
    //   io.in(roomId).emit(DISPLAY_TITLE_EVENT, data);
      socket.emit(DISPLAY_TITLE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});