import { accessDatabase } from '@/api';
import { FormProvider, ProviderObject, Subset } from '@/types';

const uploadPhoto = async (
  id: number,
  type: string,
  file: File
): Promise<{ photoLink: string }> => {
  const formData = new FormData();
  formData.append('photo', file, `${id}-${type}.${file.type.split('/')[1]}`);

  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

export const editProvider = async (provider: FormProvider, id: number) => {
  provider.general.needs_review = true;
  await accessDatabase('PATCH', 'providers', {
    id: id,
    body: provider
  });
};

export const submitNewProvider = async (provider: FormProvider) => {
  const { id: newProviderId } = await accessDatabase('POST', 'providers', {
    body: provider
  });

  //TODO move addPhotos to it's own function and call it in editprovider as well
  //next work on display providers photo on preview screen
  //BUG: editing current provider adds 'null' to all empty fields
  const { profile_photo, logo } = provider.general;
  const patchBody: Subset<FormProvider> = { general: {} };
  const photoRes =
    profile_photo[0] &&
    (await uploadPhoto(newProviderId, 'photo', profile_photo[0]));
  if (photoRes?.photoLink) patchBody.general.profile_photo = photoRes.photoLink;
  const logoRes =
    logo[0] && (await uploadPhoto(newProviderId, 'logo', logo[0]));
  if (logoRes?.photoLink) patchBody.general.logo = logoRes.photoLink;

  await accessDatabase('PATCH', 'providers', {
    id: newProviderId,
    body: patchBody
  });
};
