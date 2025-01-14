import { Server as HttpServer } from 'http';
import { Socket, Server as SocketIOServer } from 'socket.io';
import { bindChatEvents } from './events/chat/handler';
import { bindAnnouncementEvents } from './events/announcement/handler';
import { isAuth } from './services/auth';
import {
  joinPersonalRoom,
  joinRoom,
  leavePersonalRoom,
  leaveRoom,
  ROOM_EVENTS
} from './roomManager';
import { ANNOUNCEMENT_EVENTS } from './events/announcement/event';

let io: SocketIOServer; // 用於存儲 WebSocket 實例

export function initializeWebSocket(server: HttpServer): SocketIOServer {
  io = new SocketIOServer(server, {
    cors: { origin: '*' } // 根據需求設置 CORS
  });

  io.use(isAuth);

  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on(ROOM_EVENTS.JOIN_ROOM, (chatId: string) => {
      joinRoom(socket, chatId);
    });

    socket.on(ROOM_EVENTS.JOIN_PERSONAL_ROOM, () => {
      joinPersonalRoom(socket);
    });

    socket.on(ROOM_EVENTS.LEAVE_ROOM, (chatId: string) => {
      leaveRoom(socket, chatId);
    });

    socket.on(ROOM_EVENTS.LEAVE_PERSONAL_ROOM, () => {
      leavePersonalRoom(socket);
    });

    socket.on(ANNOUNCEMENT_EVENTS.JOIN_BULLETIN, () => {
      joinPersonalRoom(socket);
    });

    socket.on(ANNOUNCEMENT_EVENTS.LEAVE_BULLETIN, () => {
      leavePersonalRoom(socket);
    });

    // 聊天室事件綁定
    bindChatEvents(io);
    // 公告事件綁定
    bindAnnouncementEvents(io);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      leaveRoom(socket, socket.id);
      leavePersonalRoom(socket);
    });
  });

  return io;
}

// 獲取 WebSocket 實例
export function getIO(): SocketIOServer {
  if (!io) {
    console.error('Socket.IO not initialized');
  }
  return io;
}
