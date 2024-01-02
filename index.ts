import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

Promise.resolve()
  .then(async () => {
    await prisma.$connect();
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  })
  .finally(async () => {
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  });
