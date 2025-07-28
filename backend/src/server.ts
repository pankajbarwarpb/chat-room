import "reflect-metadata";
import http from "http";
import app from "./app";
import { initSocketServer } from "./sockets";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
