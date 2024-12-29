import { Server } from 'socket.io';
import { ANNOUNCEMENT_EVENTS } from './event';
import { SystemAnnouncement, UserAnnouncement } from './type';

export const emitAnnouncementCreated = (
  io: Server,
  userIds: string[],
  announcement: UserAnnouncement
) => {
  io.to(userIds).emit(ANNOUNCEMENT_EVENTS.CREATED, announcement);
};

export const emitSystemAnnouncement = (
  io: Server,
  announcement: SystemAnnouncement
) => {
  io.emit(ANNOUNCEMENT_EVENTS.SYSTEM_CREATED, announcement);
};
