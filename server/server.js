import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "http";
import socketSetup from "./socket/socket.js";
import authRoutes from './routes/auth.routes.js';
import sessionRoutes from './routes/session.routes.js';

config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(json());


app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);


socketSetup(server);

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 10000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
  });
