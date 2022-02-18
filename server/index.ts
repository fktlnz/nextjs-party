import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import next, { NextApiHandler } from 'next';
import * as socketio from 'socket.io';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const DISPLAY_TITLE_EVENT = "displayTitleEvent"; // Name of the event
const DISPLAY_SELECTION_EVENT = "displaySelectionEvent"; // Name of the event
const DISPLAY_ANSWER_CHECK_EVENT = "displayAnswerCheckEvent"; // Name of the event
const DISPLAY_ANSWER_EVENT = "displayAnswerEvent"; // Name of the event
const DISPLAY_END = 'displayEnd'; 

nextApp.prepare().then(async() => {
    const app: Express = express();
    const server: http.Server = http.createServer(app);
    const io: socketio.Server = new socketio.Server();
    io.attach(server);

    app.get('/hello', async (_: Request, res: Response) => {
        res.send('Hello World')
    });

    io.on('connection', (socket: socketio.Socket) => {
        console.log('connection');
        socket.emit('status', 'Hello from Socket.io');

        // Listen for new messages
        socket.on(DISPLAY_TITLE_EVENT, (data) => {
            console.log('socket-server:recieve data');
            console.log(data);
            if(data.id != 0){
                socket.broadcast.emit(DISPLAY_TITLE_EVENT, data);
            }
        //   io.in(roomId).emit(DISPLAY_TITLE_EVENT, data);
        });
        // Listen for new messages
        socket.on(DISPLAY_SELECTION_EVENT, (data) => {
            console.log('socket-server:recieve data');
            console.log(data);
            if(data.id != 0){
                socket.broadcast.emit(DISPLAY_SELECTION_EVENT, data);
            }
        });
        // Listen for new messages
        socket.on(DISPLAY_ANSWER_CHECK_EVENT, (data) => {
            console.log('socket-server:recieve data');
            console.log(data);
            if(data.id != 0){
                socket.broadcast.emit(DISPLAY_ANSWER_CHECK_EVENT, data);
            }
        });
        // Listen for new messages
        socket.on(DISPLAY_ANSWER_EVENT, (data) => {
            console.log('socket-server:recieve data');
            console.log(data);
            if(data.id!=0){
                socket.broadcast.emit(DISPLAY_ANSWER_EVENT, data);
            }
        });
        // Listen for new messages
        socket.on(DISPLAY_END, (data) => {
            console.log('socket-server:recieve data');
            console.log(data);
        //   io.in(roomId).emit(DISPLAY_TITLE_EVENT, data);
            socket.broadcast.emit(DISPLAY_END, data);
        });

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    });

    app.all('*', (req: any, res: any) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});