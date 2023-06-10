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

export const translateIDtoEN = (word: string): string => {
  const class_labels = {
    alpukat: 'avocado',
    anggur: 'grape',
    apel: 'apple',
    bayam: 'spinach',
    brokoli: 'broccoli',
    durian: 'durian',
    jagung: 'corn',
    jahe: 'ginger',
    jambu: 'guava',
    jeruk: 'orange',
    'kembang kol': 'cauliflower',
    kiwi: 'kiwi',
    kol: 'cabbage',
    lengkuas: 'galangal',
    lobak: 'radish',
    mangga: 'mango',
    melon: 'melon',
    mentimun: 'cucumber',
    naga: 'dragon fruit',
    nanas: 'pineapple',
    paprika: 'bell pepper',
    pisang: 'banana',
    salak: 'snake fruit',
    semangka: 'watermelon',
    singkong: 'cassava',
    stroberi: 'strawberry',
    terong: 'eggplant',
    tomat: 'tomato',
    'ubi jalar': 'sweet potato',
    wortel: 'carrot'
  };
  const translatedWord = class_labels[word];
  return translatedWord ? translatedWord : '';
};
