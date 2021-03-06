import { httpClient } from '../helpers/httpClient';

export const authLogin = async (payload) => {
  try {
    const { data } = await httpClient.post('auth/signin', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.token, null];
  } catch (error) {
    return [null, error];
  }
};

export const authRegister = async (payload) => {
  try {
    const { data } = await httpClient.post('auth/signup', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.token, null];
  } catch (error) {
    return [null, error];
  }
};

export const getCurrentUser = async (token) => {
  try {
    const { id } = JSON.parse(atob(token.split('.')[1]));
    const { data } = await httpClient.get(`api/users/${id}`);
    return [data.user, null];
  } catch (error) {
    return [null, error];
  }
};
