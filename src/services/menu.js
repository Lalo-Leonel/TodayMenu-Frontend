import { httpClient } from '../helpers/httpClient';

export const createMenu = async (payload) => {
  try {
    const { data } = await httpClient.post('api/menus', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.menu, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateMenu = async (payload) => {
  try {
    const { data } = await httpClient.put(
      'api/menus/' + payload.id,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return [data.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getMenuByUser = async () => {
  try {
    const { data } = await httpClient.get('api/menus');
    return [data.menus, null];
  } catch (error) {
    return [null, error];
  }
};
