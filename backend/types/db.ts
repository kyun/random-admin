export const Role = {
  OWNER: 5,
  ORGANIZER: 4,
  MASTER: 3,
  MANAGER: 2,
  USER: 1,
  GUEST: 0,
};
export const TEST = 'TEST'
export type RoleType = keyof typeof Role;

export interface Quest {
  id: number;
  quest_id: string;
  endpoint: string;
  name: string;
  description: string;
  repeatition: string;
  point: number;
  is_active: boolean;
  is_public: boolean;
  starts_at: Date;
  expire_at: Date;
}

export interface Organization {
  id: string;
  organization_id: string;
  alias: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  organization_img: string;
  owner: string;
  created_at: number;
  updated_at: number;
}
// type Role = 'MASTER' | 'MANAGER' | 'GUEST';
export interface User {
  constructor: any;

  user_id: string;
  id: string;
  password: string;
  role: RoleType;
  status: 'ACTIVE' | 'INACTIVE';
  profile_img?: string;
  name?: string;
  org_id?: string;
  description?: string;
  created_at: number;
  updated_at: number;
  exp: number;
};

export interface Authorization {
  constructor: any;
  idx: number;
  auth_id: string;
  endpoint: string; // 'POST/dev/user/add'
  name: string;
  description: string;
  default_role: RoleType | null;
  created_at: number;
  updated_at: number;
};

export interface UserAuthorization {
  user_id: string;
  authorization_id: string;
  action: 'ALLOW' | 'DENY';
  created_at: number;
  updated_at: number;
}

export interface UserAPIHistory {
  endpoint: string; // /user/add , /user/update
  params: any;
  created_by: string;
  created_at: number;
  action: string; // 'ADD_
}



export interface Banner {
  idx: number;
  banner_id: string;
  title: string;
  banner_img: string;

  publisher: string;

  created_at: Date;
  updated_at: Date;
  starts_at: Date;
  expire_at: Date;
}