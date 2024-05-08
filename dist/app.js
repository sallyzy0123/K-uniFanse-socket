"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const middlewares = __importStar(require("./middlewares"));
require('dotenv').config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    }
});
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
    });
    socket.on('update', (msg) => {
        console.log('message:', msg);
        if (msg === 'addMerchandise') {
            socket.broadcast.emit('addMerchandise', 'New Merchandise added from socket');
        }
        else if (msg === 'modifyMerchandise') {
            socket.broadcast.emit('modifyMerchandise', 'Merchandise modified from socket');
        }
        else if (msg === 'deleteMerchandise') {
            socket.broadcast.emit('deleteMerchandise', 'Merchandise deleted from socket');
        }
        // else if (msg === 'species') {
        //   socket.broadcast.emit('addSpecies', 'New species added');
        // }
    });
});
app.get('/', (req, res) => {
    res.json({
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
    });
});
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
exports.default = httpServer;
//# sourceMappingURL=app.js.map