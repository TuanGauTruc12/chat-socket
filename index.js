import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000/",
  },
});

io.on("connection", (socket) => {
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    io.to(user.socketID).emit("getMessage", data);
  });

  /*
  socket.on("removeUser", (user)=>{
    removeUser(user, socket.id);
  })
  */
});

let users = [];

const addUser = (userData, socketID) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, socketID });
};

const getUser = (userID) => {
  return users.find((user) => user.sub === userID);
};
