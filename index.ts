import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import {errorHandler} from "./middlewares/errorHandler";

const app = express();


app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



const server = http.createServer(app);
