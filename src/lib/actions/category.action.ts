'use server';

import { CreateCategoryParams } from '@/types';
import { connectToDatabase } from '../database';
import Category from '@/models/Category';
import { handleError } from '../utils';

//Create Category
export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

//Get All Category
export const getAllCategory = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
