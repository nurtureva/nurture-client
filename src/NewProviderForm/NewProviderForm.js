import { Button, Checkbox, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import './NewProviderForm.css';
import TextArea from 'antd/lib/input/TextArea';

export default function NewProviderForm(props) {
  const [radioSelects, setRadioSelects] = useState({
    visibility: ['Currently Practicing', 'Permission to share'],
    services: [],
    paymentOptions: [],
    certifications: []
  });

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
      `${process.env.REACT_APP_BASE_URL}/paymentOptions`,
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

  useEffect(async () => {
    const services = await getServices();
    const certifications = await getCertifications();
    const paymentOptions = await getPaymentOptions();
    setRadioSelects({
      ...radioSelects,
      services,
      certifications,
      paymentOptions
    });
  }, []);

  const onFinish = async (values) => {
    props.setConfirmed(true);

    //modal states todo:
    //initial - option to click to new provider or to leave a comment
    //either form
    //confirmation (your info was received, thanks! ok|cancel )
    const { contact, radioSelect } = values;
    const newProvider = {
      contact,
      ...radioSelect
    };
    newProvider.visibility = {
      'Needs Review': 'yes',
      'Currently Practicing': '',
      'Permission to share': '',
      ...newProvider.visibility
    };
    await fetch(`${process.env.REACT_APP_BASE_URL}/providers/add`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newProvider })
    });
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
          ['Phone', 'phone'],
          ['Link to Logo', 'logo']
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

  return (
    <Form onFinish={onFinish} layout="vertical">
      {renderInfoSegment()}
      {renderRadioSelects()}
      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
