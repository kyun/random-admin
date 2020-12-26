

export interface User{
  idx: number;
  user_id: string;
  id: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
  org_id: string;
  created_at: number;
  updated_at: number;
  [key: string]: any;
}