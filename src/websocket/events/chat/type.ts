export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  type: string;
  createdAt: string;
  readBy: string[];
}

export interface ChatListItem {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  latestMessage: {
    text: string;
    sentAt: string;
  };
  unreadCount: number;
}
