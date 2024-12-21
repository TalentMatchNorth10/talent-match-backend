import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { bindChatEvents } from './handlers/chatHandler';
import { bindAnnouncementEvents } from './handlers/announcementHandler';

export function initializeWebSocket(server: Server): SocketIOServer {
  const io = new SocketIOServer(server, {
    cors: { origin: '*' } // 根據需求設置 CORS
  });

  // 綁定聊天相關事件
  bindChatEvents(io);

  // 綁定公告相關事件
  bindAnnouncementEvents(io);

  return io;
}
