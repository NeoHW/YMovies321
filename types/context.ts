import type { User, UserCredential } from 'firebase/auth';

export interface AuthContext {
  user: User;
  login: ({ popup }: { popup: boolean }) => Promise<UserCredential>;
  logout: () => Promise<void>;
}
