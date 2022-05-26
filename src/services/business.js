import { httpClient } from '../helpers/httpClient';

export const createBusiness = async (payload) => {
  try {
    const { data } = await httpClient.post('api/business', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return [data.business, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateBusiness = async (payload) => {
  try {
    const { data } = await httpClient.put(
      'api/business/' + payload.id,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return [data.business, null];
  } catch (error) {
    return [null, error];
  }
};

export const getBusinessAll = async () => {
  try {
    const { data } = await httpClient.get('api/business');
    return [data.business, null];
  } catch (error) {
    return [null, error];
  }
};

export const getBusinessByUser = async (id) => {
    try {
      const { data } = await httpClient.get('api/business');
      const business = data.business.filter((item)=>item.user === id)
    //   console.log(business)
      return [business, null];
    } catch (error) {
      return [null, error];
    }
  };
