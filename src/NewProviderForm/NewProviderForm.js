import { Button, Checkbox, Form, Input, Select } from 'antd';
import React from 'react';
import './NewProviderForm.css';
import TextArea from 'antd/lib/input/TextArea';

export default function NewProviderForm(props) {
  const radioSelects = {
    visibility: ['Currently Practicing', 'Permission to share'],
    services: [
      'Doula Support',
      'Breast/Chestfeeding Support',
      'Perinatal Mental Health'
    ],
    paymentOptions: [
      'Free or Pro Bono Service',
      'Private Insurance',
      'Medicaid',
      'FAMIS',
      'Fee for Service',
      'Sliding Scale'
    ],
    certifications: [
      'International Board Certified Lactation Consultant (IBCLC)',
      'Certified Lactation Counselor (CLC)',
      'Certified Lactation Specialist (CLS)',
      'Certified Lactation Educator (CLE)',
      'Certified Breastfeeding Counselor (CBC)',
      'Lactation Education Counselor (LEC)',
      'La Leche League Leader (LLL)',
      'Breastfeeding USA Counselor',
      'Peer Breastfeeding Counselor',
      'Community Health Worker (CHW)',
      'Certified Doula (CD)',
      'Licensed Professional Counselor (LPC)',
      'Licensed Clinical Social Worker (LCSW)',
      'Licensed Clinical Psychologist (LCP)',
      'Doctor of Psychology (Psy.D)',
      'Perinatal Mental Health Certification (PMH-C)',
      'Doctoral Degree (PhD)',
      'Medical Degree (MD)',
      'Nursing Degree (RN, BSN)',
      'I do not have any credentials'
    ]
  };

  /**
   * this takes an object and replaces the undefined values with empty string.
   * This is mainly to keepy google sheets api happy, and to keep data consistent.
   *
   */
  const swapUndefinedWithEmptyStrings = (obj) => {
    const contact = { ...obj };
    for (const key in obj) {
      if (contact[key] === undefined) {
        contact[key] = '';
      }
    }
    return { contact };
  };

  /**
   * takes an object of arrays. the arrays contain values from the form.
   * We go through each array and convert it into an object and then give each value a key equal to itself.
   *
   * @param {Object} obj an object of arrays, that contain values
   * @returns {Object} newly created object of objects
   */
  const objectifyEachArray = (obj) => {
    const newObj = { ...obj };
    for (const key in obj) {
      newObj[key] = newObj[key]
        ? newObj[key].reduce((a, v) => ({ ...a, [v]: v }), {})
        : {};
    }
    return newObj;
  };

  /**
   * fills in our proivders data to the template provider. structuring the provider data how the backend expects
   *
   * @param {Object} provider the new provider built from the form
   * @returns {Object} provider the same provider but all the unused values filled in from the blank template
   */
  const fillInEmptyValues = (provider) => {
    const newProvider = { ...provider };
    for (const category in newProvider) {
      newProvider[category] = {
        ...props.template[category],
        ...newProvider[category]
      };
    }
    return newProvider;
  };

  const onFinish = async (values) => {
    props.setConfirmed(true);

    //modal states todo:
    //initial - option to click to new provider or to leave a comment
    //either form
    //confirmation (your info was received, thanks! ok|cancel )
    const { contact, radioSelect } = values;
    const newProvider = {
      ...swapUndefinedWithEmptyStrings(contact),
      ...objectifyEachArray(radioSelect)
    };
    newProvider.visibility = {
      'Needs Review': 'yes',
      'Currently Practicing': '',
      'Permission to share': '',
      ...newProvider.visibility
    };

    await fetch(`${process.env.REACT_APP_BASE_URL}/new-provider`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fillInEmptyValues(newProvider))
    });
  };
  const formItemWrapper = (element, name, subName, rules) => {
    return (
      <Form.Item
        key={name}
        className={`form-${subName}-${name}-container`}
        label={name}>
        <Form.Item name={[subName, name]} noStyle rules={rules}>
          {element}
        </Form.Item>
      </Form.Item>
    );
  };

  const renderInfoSegment = () => {
    const info = {
      general: {
        Element: Input,
        value: ['Name', 'Business Name', 'Email', 'Website', 'Phone']
      },
      address: {
        Element: Input,
        value: [
          'Address 1',
          'Address 2',
          'City',
          'State',
          'Zip Code',
          'Country'
        ]
      },
      response: { Element: TextArea, value: ['Overview'] }
    };
    return (
      <div className="info-container">
        {Object.keys(info).map((key) => {
          return (
            <div key={key} className={`form-info-${key}`}>
              {info[key].value.map((field) => {
                const { Element } = info[key];
                return formItemWrapper(
                  <Element placeholder={field} />,
                  field,
                  'contact'
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRadioSelects = () => {
    return Object.keys(radioSelects).map((key) => {
      const rules =
        key === 'visibility'
          ? ''
          : [{ required: true, message: `you must select an option` }];
      return (
        <div key={key} className={`form-radio-${key}`}>
          {formItemWrapper(
            <Checkbox.Group options={radioSelects[key]} />,
            key,
            'radioSelect',
            rules
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
