export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
