import { Socket } from 'socket.io';

// 房間管理映射
const roomMap: Record<string, Set<string>> = {};

export function joinRoom(socket: Socket, roomId: string): void {
  socket.join(roomId); // 加入 Socket.IO 的房間
  if (!roomMap[roomId]) roomMap[roomId] = new Set();
  roomMap[roomId].add(socket.id);
  console.log(`Socket ${socket.id} joined room ${roomId}`);
}

export function leaveRoom(socket: Socket, roomId?: string): void {
  if (roomId) {
    socket.leave(roomId); // 離開特定房間
    roomMap[roomId]?.delete(socket.id);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  } else {
    // 如果未指定房間，清除所有房間
    for (const room of Object.keys(roomMap)) {
      roomMap[room]?.delete(socket.id);
    }
  }
}
