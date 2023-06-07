import { EndpointType, FetchFunction, MethodType, Props } from '@/types';

export const accessDatabase: FetchFunction = async (
  method: MethodType,
  endpoint: EndpointType,
  props?: Props
) => {
  const requestOptions: RequestInit = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(props?.body);
  const path = props?.id ? `${endpoint}/${props.id}` : endpoint;

  const url = new URL(path, import.meta.env.VITE_BASE_URL);
  if (props?.params) {
    const paramEntriesStringArray = Object.entries(props.params).map(
      (entry) => {
        return [entry[0], entry[1].toString()];
      }
    );

    const params = new URLSearchParams(paramEntriesStringArray);
    url.search = params.toString();
  }

  const data = await fetch(url, {
    ...requestOptions,
    method,
    body
  });
  if (!data.ok) {
    return Promise.reject(data.clone());
  } else {
    return data.json();
  }
};
