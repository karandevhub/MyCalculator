import { BASE_URL } from '@service/authsService/config';
import axios from 'axios';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.log('Error categories fetching', error);
    return [];
  }
};

export const getProductsByCategoryId = async (id: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error products fetching', error);
    return [];
  }
};
