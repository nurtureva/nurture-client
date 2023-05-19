import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormItem from '../FormItem';
import Input from '../Input';
import { useFormInputList } from '../../utils/formInputList';
import {
  createPageContent,
  uploadPhoto,
  useDefaultValues
} from '../../utils/helpers';

export default function ProviderForm({ provider, changePageState }) {
  const formInputList = useFormInputList();
  const defaultValues = useDefaultValues(provider);
  const { register, handleSubmit } = useForm(defaultValues);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        changePageState(1, data);
      })}>
      {formInputList.map((input, i) => {
        const Element = input.Element || Input;

        return (
          <FormItem description={input.description} name={input.name} key={i}>
            <Element
              register={register}
              dbName={input.dbName}
              {...input.props}
            />
          </FormItem>
        );
      })}
      <input type="submit" />
    </form>
  );
}

const formContent = createPageContent(
  'Add your practice to the directory',
  'Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.',
  ProviderForm
);

const EditProviderForm = () => {
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState();
  useEffect(async () => {
    const hashChecker = async (userId, editHash) => {
      const hashCheck = await fetch(
        `${process.env.REACT_APP_BASE_URL}/providers/${userId}/${editHash}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return hashCheck.json();
    };
    const getProvider = async (id) => {
      const provider = await fetch(
        `${process.env.REACT_APP_BASE_URL}/providers/${id}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return provider.json();
    };

    const url = window.location.href.split('/');
    const userId = url[url.length - 3];
    const editHash = url[url.length - 1];
    if (editHash) {
      // const hashCheck = await hashChecker(userId, editHash);
      const hashCheck = true;
      // setError(!hashCheck);
      if (hashCheck) {
        console.log(userId);
        setProvider(await getProvider(userId));
      }
    }
    setLoading(false);
  }, []);

  if (loading) return 'loading... ';
  return <ProviderForm provider={provider} />;
};

const NewProviderForm = ({ setPageState }) => {
  const onSubmit = async (data) => {
    setPageState(1);
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/providers`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newProvider: data })
    });
    const response = await res.json();
    const { id } = response;
    const { photo, logoFile } = data.pictures;
    if ((photo || logoFile) && id) {
      const { upload: profile_photo } = await uploadPhoto(
        id,
        'photo',
        photo[0]
      );
      const { upload: logo } = await uploadPhoto(id, 'logo', logoFile[0]);

      const patchBody = { profile_photo, logo };
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/providers/${id}`,
        {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ patchBody })
        }
      );
    }
  };
  return <ProviderForm onSubmit={onSubmit} />;
};

export { formContent };
