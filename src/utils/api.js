const getFromDb = async (endpoint) => {
  const data = await fetch(`${process.env.REACT_APP_BASE_URL}/${endpoint}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data.json();
};

export const usePageLoader = async () => {
  const providers = await getFromDb('providers');
  const services = await getFromDb('services');
  const certifications = await getFromDb('certifications');
  const paymentOptions = await getFromDb('payment-options');

  return { providers, services, certifications, paymentOptions };
};

export const getClosestZipCodes = async (searchTerm) => {
  let result;
  try {
    result = await fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/zip-codes?value=${searchTerm}&radius=${5}`
    );
  } catch (err) {
    result = '';
  }

  return result.json();
};
