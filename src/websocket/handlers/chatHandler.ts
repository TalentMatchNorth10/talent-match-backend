import { Server, Socket } from 'socket.io';
import { joinRoom, leaveRoom } from '../roomManager';

export function bindChatEvents(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (chatId: string) => {
      joinRoom(socket, chatId);
    });

    // 處理新訊息事件
    socket.on('', async (payload: any) => {});

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      leaveRoom(socket);
    });
  });
}
