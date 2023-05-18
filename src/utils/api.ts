import { LoaderFunctionArgs } from 'react-router-dom';

interface Option {
  name: string;
  id: number;
}

interface ZipCode {
  zip_code: string;
  distance: number;
  city: string;
  state: string;
}

const getFromDb = async (endpoint: string): Promise<Option[]> => {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data.json();
};

export const useOptionsLoader = async () => {
  const services = await getFromDb('services');
  const certifications = await getFromDb('certifications');
  const paymentOptions = await getFromDb('payment-options');

  return { services, certifications, paymentOptions };
};

export const useMainPageLoader = async () => {
  const providers = await getFromDb('providers');
  const options = await useOptionsLoader();

  return { providers, ...options };
};

export const useProviderLoader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params;

  const provider = await getFromDb(`providers/${userId}`);

  return { provider };
};

export const getClosestZipCodes = async (
  searchTerm: string
): Promise<ZipCode[] | unknown> => {
  try {
    const result = await fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/zip-codes?value=${searchTerm}&radius=${5}`
    );

    return result.json();
  } catch (err) {
    return err;
  }
};
