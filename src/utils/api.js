export const getProviders = async () => {
  const providers = await fetch(`${process.env.REACT_APP_BASE_URL}/providers`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return providers.json();
};

export const getClosestZipCodes = async (searchTerm) => {
  const { zip, radius } = searchTerm;
  let result;
  try {
    result = await fetch(
      `${process.env.REACT_APP_BASE_URL}/zip-codes?value=${zip}&radius=${radius}`
    );
  } catch (err) {
    result = '';
  }

  return result.json();
};
