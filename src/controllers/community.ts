import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommunity } from '../types/community';

const prisma = new PrismaClient();

export const createCommunity = async (community: CreateCommunity) => {
  const result = await prisma.community.create({
    data: {
      id: uuidv4(),
      title: community.title,
      content: community.content,
      pathfile: community.pathfile,
      userID: community.userID
    },
    include: {
      user: true
    }
  });
  return result;
};

export const getAllCommunity = async () => {
  const result = await prisma.community.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return result;
};

export const getCommunityByTitle = async (title: string) => {
  const result = await prisma.community.findMany({
    where: {
      title: {
        contains: title
      }
    }
  });
  return result;
};

export const getCommunityById = async (id: string) => {
  const result = await prisma.community.findUnique({
    where: {
      id
    },
    include: {
      user: true
    }
  });
  return result;
};
