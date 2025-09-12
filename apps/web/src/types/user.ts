export interface User {
  id: number;
  username: string;
  nickname?: string;
  email: string;
  createdAt: string;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}
