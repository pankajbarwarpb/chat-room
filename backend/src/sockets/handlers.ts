import { Socket } from "socket.io";

const connectedUsers = new Map<string, Socket>(); // username : socket.id

export const registerSocketHandlers = (socket: Socket) => {
  let _username: string;

  socket.on("message", (data) => {
    console.log("Received message: ", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("register", (data) => {
    const username = data.username as string;
    _username = username;
    disconnectUser(username);

    // send list of old users
    socket.emit("activeUsers", Array.from(connectedUsers.keys()));

    connectedUsers.set(username, socket);

    // broadcast for new user
    socket.broadcast.emit("activeUsers", [username]);
  });

  socket.on("offer", (data) => {
    console.log("onOffer", data.from, data.to);
    if (sendToUser(data.to, "offer", data)) {
      console.log(`Offer sent to ${data.to}`);
    } else {
      console.log(`Unable to send offer to ${data.to}`);
    }
  });

  socket.on("answer", (data) => {
    console.log("onAnswer", data.from, data.to);
    if (sendToUser(data.to, "answer", data)) {
      console.log(`Answer sent to ${data.to}`);
    } else {
      console.log(`Unable to send answer to ${data.to}`);
    }
  });

  socket.on("ice", (data) => {
    console.log("onICE", data.from, data.to);
    if (sendToUser(data.to, "ice", data)) {
      console.log(`ICE sent to ${data.to}`);
    } else {
      console.log(`Unable to send ICE to ${data.to}`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    connectedUsers.delete(_username);

    // broadcast for new user
    socket.broadcast.emit("disconnectedUsers", [_username]);
  });
};

export const disconnectUser = (username: string) => {
  const socket = connectedUsers.get(username);
  socket?.disconnect();
};

export const sendToUser = (
  username: string,
  event: string,
  message: object
) => {
  try {
    console.log({ username, event, message });

    const socket = connectedUsers.get(username);
    if (socket) {
      socket.emit(event, message);
      return true;
    }
  } catch (error) {
    console.log("Error sending socket message : ", error);
  }
  return false;
};
