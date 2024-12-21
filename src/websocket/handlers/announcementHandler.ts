import { Server, Socket } from 'socket.io';
import { joinRoom } from '../roomManager';

export function bindAnnouncementEvents(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', (chatId: string) => {
      joinRoom(socket, chatId);
    });

    // 處理新公告事件
    socket.on('', async (payload: any) => {});
  });
}
