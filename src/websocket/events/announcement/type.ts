export interface UserAnnouncement {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  title: string;
  text: string;
  createdAt: string;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  text: string;
  createdAt: string;
}
