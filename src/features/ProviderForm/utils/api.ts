import { accessDatabase } from '@/api';
import { FormOrganization, FormProvider } from '@/types';
import { Pictures, useFormContext } from './formContext';

const uploadPhotos = async (id: number, pictures: Pictures) => {
  const formData = new FormData();
  if (!Object.keys(pictures).length) return;
  Object.keys(pictures).forEach((pictureType) => {
    const file = pictures[pictureType as keyof Pictures];
    if (!file) return;
    formData.append(
      pictureType,
      file,
      `${id}-${pictureType}.${file.type.split('/')[1]}`
    );
  });
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/s3/${id}`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

const editProvider = async (provider: FormProvider) => {
  provider.general.needs_review = true;
  const id = Number(window.location.pathname.split('/')[1]);
  await accessDatabase('PATCH', 'providers', {
    id,
    body: provider
  });

  return id;
};
const editOrganization = async (organization: FormOrganization) => {
  organization.general.needs_review = true;
  const id = Number(window.location.pathname.split('/')[1]);
  await accessDatabase('PATCH', 'organizations', {
    id,
    body: organization
  });

  return id;
};

export const submitProvider = async (provider: FormProvider) => {
  const { id } = await accessDatabase('POST', 'providers', {
    body: provider
  });
  return id;
};
export const submitOrganization = async (organization: FormOrganization) => {
  const { id } = await accessDatabase('POST', 'organizations', {
    body: organization
  });
  return id;
};

export const useFormAction = (providerType: 'individual' | 'organization') => {
  const {
    formData: { pictures }
  } = useFormContext();

  if (providerType === 'organization') {
    return window.location.pathname.includes('provider-form')
      ? submitOrganization
      : editOrganization;
  }

  const formFuncton = window.location.pathname.includes('provider-form')
    ? submitProvider
    : editProvider;
  return async (provider: FormProvider) => {
    const newId = await formFuncton(provider);
    uploadPhotos(newId, pictures);
  };
};

export const deletePhoto = async (key: string) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/s3/${key}`, {
    method: 'DELETE'
  });
  return res.json();
};
