import { Button, Checkbox, Form, Input, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import './NewProviderForm.css';
import TextArea from 'antd/lib/input/TextArea';

export default function NewProviderForm(props) {
  const [radioSelects, setRadioSelects] = useState({
    visibility: ['Currently Practicing', 'Permission to share'],
    services: [], //array [id, id, id] turn into [{id, description}] VVVVVV
    paymentOptions: [], //VVVVVVVvv
    certifications: [] //VVVVVVV
  });
  const [provider, setProvider] = useState();
  const [initialValues, setInitialValues] = useState({
    contact: {},
    radioSelects: {}
  });
  const [photo, setPhoto] = useState();
  const [logo, setLogo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function getServices() {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/services`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  }
  async function getPaymentOptions() {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/payment-options`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  }
  async function getCertifications() {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/certifications`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  }

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

  useEffect(async () => {
    console.log('sanity');
    const url = window.location.href.split('/');
    const userId = url[url.length - 3];
    const editHash = url[url.length - 1];
    if (editHash) {
      // const hashCheck = await hashChecker(userId, editHash);
      const hashCheck = true;
      setError(!hashCheck);
      if (hashCheck) {
        setProvider(await getProvider(userId));
      }
    }

    const services = await getServices();
    const certifications = await getCertifications();
    const paymentOptions = await getPaymentOptions();
    setRadioSelects({
      ...radioSelects,
      services,
      certifications,
      paymentOptions
    });

    setLoading(false);
  }, []);

  useEffect(async () => {
    if (provider) {
      const flattenObject = (optionsArray) => {
        return optionsArray.map((option) => option.id);
      };
      const contact = { ...provider };
      const radioSelect = {
        services: flattenObject(provider.services),
        certifications: flattenObject(provider.certifications),
        paymentOptions: flattenObject(provider.paymentOptions),
        visibility: [
          provider.currently_practicing
            ? 'Currently Practicing'
            : 'not practicing',
          provider.shareable ? 'Permission to share' : 'not sharing'
        ]
      };
      setInitialValues({ contact, radioSelect });
    }
  }, [provider]);

  const onFinish = async (values) => {
    props.setConfirmed && props.setConfirmed(true);

    //modal states todo:
    //initial - option to click to new provider or to leave a comment
    //either form
    //confirmation (your info was received, thanks! ok|cancel )
    const { contact, radioSelect } = values;
    console.log(radioSelect);
    const newProvider = {
      contact,
      ...radioSelect
    };

    const visibility = {
      needs_review: true
    };

    newProvider.visibility.forEach((option) => {
      visibility[
        option === 'Permission to share' ? 'shareable' : 'currently_practicing'
      ] = true;
    });
    newProvider.contact = {
      ...newProvider.contact,
      ...visibility
    };
    // if (provider) {
    //   await fetch(
    //     `${process.env.REACT_APP_BASE_URL}/providers/${provider.id}`,
    //     {
    //       method: 'PATCH',
    //       mode: 'cors',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ patchBody: newProvider })
    //     }
    //   );
    // } else {
    //   const res = await fetch(`${process.env.REACT_APP_BASE_URL}/providers`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ newProvider })
    //   });
    //   const response = await res.json();
    //   const { id } = response;
    //   if (photo || logo) {
    //     const { upload: profile_photo } = photo
    //       ? await uploadPhoto(id, 'photo', photo)
    //       : '';
    //     const { upload: newLogo } = logo
    //       ? await uploadPhoto(id, 'logo', logo)
    //       : '';
    //     const patchBody = { profile_photo, logo: newLogo };
    //     const res = await fetch(
    //       `${process.env.REACT_APP_BASE_URL}/providers/${id}`,
    //       {
    //         method: 'PATCH',
    //         mode: 'cors',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ patchBody })
    //       }
    //     );
    //   }
    // }
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

  const formItemWrapper = (element, name, subName, rules, dbName) => {
    return (
      <Form.Item
        key={name}
        className={`form-${subName}-${name}-container`}
        label={name}>
        <Form.Item name={[subName, dbName || name]} noStyle rules={rules}>
          {element}
        </Form.Item>
      </Form.Item>
    );
  };

  const renderInfoSegment = () => {
    const info = {
      general: {
        Element: Input,
        value: [
          ['Name', 'name'],
          ['Business Name', 'business'],
          ['Email', 'email'],
          ['Website', 'website'],
          ['Phone', 'phone']
        ],
        rules: (fieldName) => {
          if (fieldName === 'name') {
            return [{ required: true, message: 'Name is a required field' }];
          }
          if (fieldName === 'phone') {
            return [
              { len: 10, message: 'phone number must be 10 digits' },
              {
                pattern: '^(0|[1-9][0-9]*)$',
                message: 'phone number must only contain numbers'
              }
            ];
          }
          return '';
        }
      },
      address: {
        Element: Input,
        value: [
          ['Address 1', 'address_1'],
          ['Address 2', 'address_2'],
          ['City', 'city'],
          ['State', 'state'],
          ['Zip Code', 'zip'],
          ['Country', 'country']
        ]
      },
      response: { Element: TextArea, value: [['Overview', 'overview']] }
    };
    return (
      <div className="info-container">
        {Object.keys(info).map((key) => {
          return (
            <div key={key} className={`form-info-${key}`}>
              {info[key].value.map((field) => {
                const { Element } = info[key];
                const { rules } = info[key];
                return formItemWrapper(
                  <Element placeholder={field[0]} />,
                  field[0],
                  'contact',
                  rules && rules(field[1]),
                  field[1]
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRadioSelects = () => {
    const unCamelCase = (string) => {
      return string
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .toLowerCase();
    };
    return Object.keys(radioSelects).map((key) => {
      const rules =
        key === 'visibility'
          ? ''
          : [{ required: true, message: `you must select an option` }];
      const optionsArray = radioSelects[key].map((option) => {
        return { label: option.name || option, value: option.id || option };
      });
      console.log('key:', key, '\br', 'option:', radioSelects[key]);
      return (
        <div key={key} className={`form-radio-${key}`}>
          {formItemWrapper(
            <Checkbox.Group options={optionsArray} />,
            unCamelCase(key),
            'radioSelect',
            rules,
            key
          )}
        </div>
      );
    });
  };

  if (loading) return <p>loading...</p>;
  if (error) return <p>error...</p>;
  return (
    <Form onFinish={onFinish} layout="vertical" initialValues={initialValues}>
      {renderInfoSegment()}
      <div>
        <Upload
          accept=".png,.jpg,.jpeg"
          // beforeUpload={(photo) => {
          //   photo.name = 'test.jpg';
          //   photo.lastModified = new Date();
          //   console.log(photo instanceof File);
          //   const reader = new FileReader();
          //   reader.onload = (e) => {
          //     console.log(e.target.result);
          //   };
          //   reader.readAsText(photo);
          //   setPhoto(photo);
          //   return false;
          // }}
          customRequest={(a, b, c) => {
            setPhoto(a.file);
          }}>
          <Button>Upload</Button>
        </Upload>
      </div>
      {/* <div>
        <Upload
          accept=".png,.jpg,.jpeg"
          beforeUpload={(photo) => {
            photo.name = 'test.jpg';
            photo.lastModified = new Date();
            console.log(photo instanceof File);

            setLogo(photo);
            return false;
          }}>
          <Button>Upload</Button>
        </Upload>
      </div> */}
      {renderRadioSelects()}
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
