import { CRUDFactory, EndpointType, MethodType } from '@/types';

export const useApi: CRUDFactory = (method, endpoint) => {
  return (body?) => accessDatabase(method, endpoint, body);
};

const accessDatabase = async (
  method: MethodType,
  endpoint: EndpointType,
  body?: any
) => {
  const requestOptions: RequestInit = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {
    ...requestOptions,
    method,
    body
  });

  return data.json();
};
