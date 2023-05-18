const uploadPhoto = async (id, type, file) => {
  const formData = new FormData();
  formData.append('photo', file, `${id}-${type}.${file.type.split('/')[1]}`);

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

const useDefaultValues = (provider) => {
  const flattenArray = (array) => {
    return array.map((option) => {
      return option.id.toString();
    });
  };
  return provider
    ? {
        defaultValues: {
          general: provider,
          services: flattenArray(provider.services),
          paymentOptions: flattenArray(provider.paymentOptions),
          certifications: flattenArray(provider.certifications)
        }
      }
    : {};
};

export { uploadPhoto, useDefaultValues };
