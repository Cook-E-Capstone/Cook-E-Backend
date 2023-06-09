import { PrismaClient } from '@prisma/client';
import { CreateUser, LoginUser, User } from '../types/user';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const createUser = async (user: CreateUser): Promise<User> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hash = await bcrypt.hash(user.password, salt);

  const result = await prisma.user.create({
    data: {
      id: uuidv4(),
      email: user.email,
      name: user.name,
      password: hash
    }
  });
  return result;
};

export const loginUser = async (user: LoginUser): Promise<User> => {
  const existingUser = await getUserByEmail(user.email);

  if (!existingUser) {
    return null;
  }

  const passwordMatch = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!passwordMatch) {
    return null;
  }

  return existingUser;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  return result;
};

export const getUserById = async (userID: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userID
    }
  });

  return result;
};
