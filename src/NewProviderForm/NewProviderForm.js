import { Button, Checkbox, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import './NewProviderForm.scss';
import { useForm } from 'react-hook-form';

const ProviderForm = ({ onSubmit, provider }) => {
  const CheckboxOptionGroup = ({ title, endpoint, formKey, register }) => {
    const [optionArray, setOptionArray] = useState([]);

    const getOptionArrayFromDb = async () => {
      const providers = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return providers.json();
    };

    useEffect(async () => {
      const optionsPromise = await getOptionArrayFromDb();
      setOptionArray(optionsPromise);
    }, []);

    return (
      <fieldset className={formKey}>
        <legend>{title}</legend>
        <ul>
          {optionArray.length &&
            optionArray.map((option) => {
              return (
                <li>
                  <label key={option.id}>
                    <input
                      type="checkbox"
                      value={option.id}
                      name={title}
                      {...register(`${formKey}`)}
                    />
                    {option.name}
                  </label>
                </li>
              );
            })}
        </ul>
      </fieldset>
    );
  };

  const InputWrapper = ({ name, dbName, register, className }) => {
    return (
      <label className={'input-label ' + className}>
        {name}
        <input name={name} {...register(`general.${dbName}`)} />
      </label>
    );
  };

  const InputGroup = ({ inputArray, register }) => {
    return (
      <fieldset className="general-info-container">
        {inputArray.map((input, i) => {
          return (
            <InputWrapper
              className={i < 2 ? 'long-input' : ''}
              dbName={input.dbName}
              name={input.name}
              register={register}
              key={input.dbName}
            />
          );
        })}
      </fieldset>
    );
  };

  const flattenArray = (array) => {
    return array.map((option) => {
      return option.id.toString();
    });
  };
  const defaultValues = provider
    ? {
        defaultValues: {
          general: provider,
          services: flattenArray(provider.services),
          paymentOptions: flattenArray(provider.paymentOptions),
          certifications: flattenArray(provider.certifications)
        }
      }
    : {};

  const { register, handleSubmit } = useForm(defaultValues);

  const generalInfoInputArray = [
    { name: 'Name', dbName: 'name' },
    { name: 'Business Name', dbName: 'business_name' },
    { name: 'Email', dbName: 'email' },
    { name: 'Phone', dbName: 'phone' },
    { name: 'Website', dbName: 'website' }
  ];
  const addressInputArray = [
    { name: 'Address 1', dbName: 'address_1' },
    { name: 'Address 2', dbName: 'address_2' },
    { name: 'City', dbName: 'city' },
    { name: 'State', dbName: 'state' },
    { name: 'Zip Code', dbName: 'zip' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup inputArray={generalInfoInputArray} register={register} />
      <InputGroup inputArray={addressInputArray} register={register} />
      <fieldset className="overview-container">
        <label className="input-label">
          Overview
          <textarea {...register('general.overview')} />
        </label>
      </fieldset>
      <fieldset className="photo-container">
        <label>
          Profile Photo
          <input type="file" {...register('pictures.photo')} />
        </label>
        <label>
          Logo
          <input type="file" {...register('pictures.logoFile')} />
        </label>
      </fieldset>
      <fieldset className="visibility-container">
        <label>
          <input type="checkbox" checked {...register('general.shareable')} />
          Permission to Share?
        </label>
        <label>
          <input
            type="checkbox"
            checked
            {...register('general.currently_practicing')}
          />
          Currently Practicing?
        </label>
      </fieldset>
      <fieldset className="options-group-container">
        <CheckboxOptionGroup
          title="Services"
          formKey="services"
          endpoint="services"
          register={register}
        />
        <CheckboxOptionGroup
          title="Payment Options"
          formKey="paymentOptions"
          endpoint="payment-options"
          register={register}
        />
        <CheckboxOptionGroup
          title="Certifications"
          formKey="certifications"
          endpoint="certifications"
          register={register}
        />
      </fieldset>
      <input type="submit" />
    </form>
  );
};

const uploadPhoto = async (id, type, file) => {
  const formData = new FormData();
  formData.append('photo', file, `${id}-${type}.${file.type.split('/')[1]}`);

  const res = await fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
};

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

const NewProviderForm = () => {
  const onSubmit = async (data) => {
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

export { NewProviderForm, EditProviderForm };
