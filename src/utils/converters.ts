import { User, UserData } from '../types/user';

export const convertUserData = (user: User): UserData => {
  const result: UserData = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
  return result;
};
