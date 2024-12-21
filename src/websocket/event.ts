export const SOCKET_EVENTS = {
  NEW_MESSAGE: 'newMessage', // 用戶發送新訊息給其他用戶(C -> S)
  MESSAGE_RECEIVED: 'messageReceived', // 接收伺服器推送的新訊息(S -> C)
  MARK_MESSAGE_AS_READ: 'markMessageAsRead', // 當用戶開啟聊天室時，將訊息標記為已讀(C -> S)
  MESSAGE_READ_STATUS_UPDATED: 'messageReadStatusUpdated', // 通知訊息發送者訊息已被閱讀(S -> C)
  NEW_ANNOUCEMENT: 'newAnnouncement', // 發送老師新增的公告 (S -> C)
  MARK_ANNOUNCEMENT_AS_READ: 'markAnnouncementAsRead', // 用戶標記公告為已讀
  ANNOUNCEMENT_READ_STATUS_UPDATED: 'announcementReadStatusUpdated' // 通知其他相關用戶公告已讀狀態更新
};
