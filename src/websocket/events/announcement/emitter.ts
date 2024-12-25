import { Server } from 'socket.io';
import { ANNOUNCEMENT_EVENTS } from './event';

export const emitAnnouncementCreated = (io: Server, announcement: any) => {
  io.emit(ANNOUNCEMENT_EVENTS.CREATED, announcement);
  console.log('Broadcasted new announcement:', announcement);
};
