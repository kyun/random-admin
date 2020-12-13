const ROLE = {
  MASTER: 3,
  MANAGER: 2,
  GUEST: 1,
};
type Role = typeof ROLE[keyof typeof ROLE];
// type Role = 'MASTER' | 'MANAGER' | 'GUEST';
export interface User {
  user_id: string;
  id: string;
  password: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: number;
  updated_at: number;
};

export interface Authorization {
  authorization_id: string;
  description: string;
  provided_to: Role | null; // TODO: rename
};

export interface UserAuthorization {
  user_id: string;
  authorization_id: string;
  action: 'ALLOW' | 'DENY';
  created_at: number;
  updated_at: number;
}