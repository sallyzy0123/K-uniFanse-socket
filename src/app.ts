import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import {createServer} from 'http';
import {Server} from 'socket.io';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import {ClientToServerEvents, ServerToClientEvents} from './interfaces/Socket';

require('dotenv').config();

const app = express();

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: '*',
  }
});

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);
  
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on('update', (msg) => {
    console.log('message:', msg);
    if (msg === 'addMerchandise') {
      socket.broadcast.emit('addMerchandise', 'New Merchandise added from socket');
    } else if (msg === 'modifyMerchandise') {
      socket.broadcast.emit('modifyMerchandise', 'Merchandise modified from socket');
    } else if (msg === 'deleteMerchandise') {
      socket.broadcast.emit('deleteMerchandise', 'Merchandise deleted from socket');
    }
  });
});

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default httpServer;