import { Socket } from 'socket.io';

export enum ROOM_EVENTS {
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  JOIN_PERSONAL_ROOM = 'joinPersonalRoom',
  LEAVE_PERSONAL_ROOM = 'leavePersonalRoom'
}

// 房間管理映射
const roomMap: Record<string, Set<string>> = {};

// 加入房間
export function joinRoom(socket: Socket, roomId: string): void {
  socket.join(roomId); // 加入 Socket.IO 的房間
  if (!roomMap[roomId]) roomMap[roomId] = new Set();
  roomMap[roomId].add(socket.id);
  console.log(`Socket ${socket.id} joined room ${roomId}`);
}

// 離開房間
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
    console.log(`Socket ${socket.id} left all rooms`);
  }
}

// 加入個人房間
export function joinPersonalRoom(socket: Socket): void {
  const user = socket.data.user; // 使用驗證後的使用者資訊
  if (!user) {
    console.error(
      `Socket ${socket.id} cannot join personal room without user authentication`
    );
    return;
  }

  const personalRoomId = `user-${user._id}`; // 動態生成個人房間名稱
  joinRoom(socket, personalRoomId); // 使用通用的加入房間邏輯
  socket.emit('room-joined', {
    roomId: personalRoomId,
    message: `已成功加入個人房間 ${personalRoomId}`
  });
}

// 離開個人房間
export function leavePersonalRoom(socket: Socket): void {
  const user = socket.data.user; // 使用驗證後的使用者資訊
  if (!user) {
    console.error(
      `Socket ${socket.id} cannot leave personal room without user authentication`
    );
    return;
  }

  const personalRoomId = `user-${user._id}`; // 動態生成個人房間名稱
  leaveRoom(socket, personalRoomId); // 使用通用的離開房間邏輯
  socket.emit('room-left', {
    roomId: personalRoomId,
    message: `已成功離開個人房間 ${personalRoomId}`
  });
}
