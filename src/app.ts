import express, { Request, Response } from 'express';
import router from './routes';
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

import { NotificationRepository } from './repositories/notificationRepository';


const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});





// Object để lưu trữ socketID của người dùng
const users: { [key: string]: string } = {};



io.on('connection', (socket:any) => {
  // console.log('A user connected:', socket.id);

  // Lắng nghe sự kiện 'register' từ client để lưu userID và socketID
  socket.on('register', (userId: string) => {
    users[userId] = socket.id;
    // console.log('User registered:', userId);
  });

  // Lắng nghe sự kiện 'sendNotification' từ client
  socket.on('sendNotification', async (data: { userId: string; message: string }) => {
      const { userId, message } = data;

      const recipientSocketId = users[userId];
      if (recipientSocketId) {
        let Notification= new NotificationRepository()
        await Notification.Create(data);
        io.to(recipientSocketId).emit('receiveNotification', message);

        console.log(`Notification sent to user ${userId}: ${message}`);

      } else {
        console.log(`User ${userId} not found`);
      }
 
  });

  socket.on('disconnect', () => {
    // console.log('User disconnected:', socket.id);
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

app.use('/uploads',express.static('uploads'));

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type','Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// httpServer.listen(3003, () => {
//   console.log(`IO on /:3000`);
// });
