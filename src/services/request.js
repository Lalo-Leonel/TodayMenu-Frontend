import { httpClient } from '../helpers/httpClient';

export const createRequest = async (payload) => {
  try {
    const { data } = await httpClient.post('api/requests', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return [data.request, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateRequest = async (payload) => {
  try {
    const { data } = await httpClient.put(
      'api/requests/' + payload.id,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return [data.request, null];
  } catch (error) {
    return [null, error];
  }
};

export const getRequestAll = async () => {
  try {
    const { data } = await httpClient.get('api/requests');
    console.log(data);
    return [data.requests, null];
  } catch (error) {
    return [null, error];
  }
};

export const getRequestByUser = async (id) => {
    try {
      const { data: {requests} } = await httpClient.get('api/requests');
      const request = requests.filter((item)=> item.user === id)
      console.log(requests);
      return [requests, null];
    } catch (error) {
      return [null, error];
    }
  };

  export const getRequestByBusiness = async (id) => {
    try {
      const { data: {requests} } = await httpClient.get('api/requests');
      const { data: { business } } = await httpClient.get('api/business')
      const empresa = business.filter((item)=> item.user === id)
      const request = requests.filter((item)=> item.menu.business == empresa[0]._id)
      return [request, null];
    } catch (error) {
      return [null, error];
    }
  };
