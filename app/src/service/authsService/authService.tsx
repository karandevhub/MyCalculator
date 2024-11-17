import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorsge } from '@state/storage';
import { useAuthStore } from '@state/authStore';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { appAxios } from '@service/apiService/apiInterceptor';

export const CustomerLoginApi = async (phone: string) => {
  const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
  const { accessToken, refreshToken, customer } = response.data;
  tokenStorsge.set('accessToken', accessToken);
  tokenStorsge.set('refreshToken', refreshToken);
  const { setUser } = useAuthStore.getState();
  setUser(customer);
};

export const DeliveryLoginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const { accessToken, refreshToken, deliveryPartner } = response.data;
    tokenStorsge.set('accessToken', accessToken);
    tokenStorsge.set('refreshToken', refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log(error);
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    setUser(response?.data?.user);
  } catch (error) {
    console.log('User Fetch error', error);
  }
};

export const refresh_token = async () => {
  try {
    const refreshToken = tokenStorsge.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;
    tokenStorsge.set('accessToken', new_access_token);
    tokenStorsge.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.error('REFRESH TOKEN ERROR', error);
    tokenStorsge.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};
