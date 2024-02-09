import { accessDatabase } from '@/api';
import { FormOrganization, FormProvider, OptionsObject } from '@/types';
import { Pictures, useFormContext } from './formContext';

const uploadPhotos = async (id: number, pictures: Pictures) => {
  const formData = new FormData();
  Object.keys(pictures).forEach((pictureType) => {
    const file = pictures[pictureType as keyof Pictures];
    if (!file) return;
    formData.append(
      pictureType,
      file,
      `${id}-${pictureType}.${file.type.split('/')[1]}`
    );
  });

  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/providers/${id}/upload`,
    {
      method: 'PATCH',
      body: formData
    }
  );
  return res.json();
};

const editProvider = async (provider: FormProvider) => {
  const id = Number(window.location.pathname.split('/')[1]);
  await accessDatabase('PATCH', 'providers', {
    id,
    body: provider
  });

  return id;
};

export const addHash = async (id: number, note: string) => {
  await accessDatabase('PATCH', 'providers', {
    id: id + '?addHash=true',
    body: { note }
  });

  return id;
};

const editOrganization = async (organization: FormOrganization) => {
  const id = Number(window.location.pathname.split('/')[1]);
  await accessDatabase('PATCH', 'organizations', {
    id,
    body: organization
  });

  return id;
};

export const uploadDemographics = async (
  demographics: OptionsObject,
  id: number
) => {
  const { ethnicity, gender, ...general } = demographics;
  general.provider_id = id;
  const foo = await accessDatabase('POST', 'demographic-profiles', {
    body: { general, ethnicity, gender }
  });
  console.log('demographic response:', foo, '\n id:', id);
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

  return async (
    providerWithDemographics: FormProvider & { demographics: OptionsObject }
  ) => {
    const { demographics, ...provider } = providerWithDemographics;
    const newId = await formFuncton(provider);
    if (demographics) {
      const demo = uploadDemographics(demographics, newId);
    }
    if (Object.keys(pictures).length) {
      const photo = uploadPhotos(newId, pictures);
      console.log(photo);
    }

    return newId;
  };
};

export const deletePhoto = async (key: string) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/s3/${key}`, {
    method: 'DELETE'
  });
  return res.json();
};
