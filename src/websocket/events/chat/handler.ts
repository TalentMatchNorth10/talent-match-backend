import { Server } from 'socket.io';

// 此檔案負責處理聊天室事件的監聽 (handler) 邏輯
// 如果需回傳錯誤至client可搭配使用 `withErrorHandling` 封裝
export function bindChatEvents(io: Server): void {}
