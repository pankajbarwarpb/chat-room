import express from "express";

// Create HTTP server
const app = express();

// Define routers
// app.use('/api/auth', authRouter);

app.listen((PORT) => {
  console.log(`Server started at port : ${PORT}`);
});
