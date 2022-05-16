import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './Navigation.css';

import { Select, Input, Button, Menu, Dropdown } from 'antd';
const { Option } = Select;
const { Search } = Input;

export default function Navigation(props) {
  const [nameValue, setNameValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  const [zipRadius, setZipRadius] = useState(5);
  const [servicesValues, setServicesValues] = useState([]);
  const [paymentValues, setPaymentValues] = useState([]);
  const filters = {
    services: [
      'Doula Support',
      'Breast/Chestfeeding Support',
      'Perinatal Counseling'
    ],
    paymentOptions: [
      'Free or Pro Bono',
      'Private Insurance',
      'Medicaid',
      'FAMIS',
      'Fee for Service',
      'Sliding Scale'
    ]
  };

  //https://ant.design/components/dropdown/
  const [menuVisible, setMenuVisible] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === '3') {
      setMenuVisible(false);
    }
  };
  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };

  const clearForm = () => {
    setPaymentValues([]);
    setServicesValues([]);
    setZipValue('');
  };

  const setSearch = () => {
    setNameValue('');
    props.setSearchTerm({ name: nameValue.toLowerCase() });
  };

  const submitFilters = () => {
    const updateData = {};
    if (servicesValues.length) {
      updateData.services = servicesValues.map((option) => {
        return option.label;
      });
    }
    if (paymentValues.length) {
      updateData.paymentOptions = paymentValues.map((option) => {
        return option.label;
      });
    }
    if (zipValue) {
      updateData.zipCode = { value: zipValue, radius: zipRadius };
    }
    props.updateFilters(updateData);

    clearForm();
  };

  const menu = (
    <Menu
      className="filters-container"
      onClick={handleMenuClick}
      style={{ width: '300px' }}>
      <Menu.Item key={0}>
        <Select
          mode="multiple"
          allowClear
          showArrow
          labelInValue
          placeholder="Services"
          value={servicesValues}
          onChange={(value) => {
            setServicesValues(value);
          }}>
          {filters.services.map((service) => {
            return <Option key={JSON.stringify(service)}>{service}</Option>;
          })}
        </Select>
      </Menu.Item>
      <Menu.Item key={1}>
        <Select
          mode="multiple"
          allowClear
          showArrow
          labelInValue
          placeholder="Payment Options"
          value={paymentValues}
          onChange={(value) => {
            setPaymentValues(value);
          }}>
          {filters.paymentOptions.map((paymentOption) => {
            return (
              <Option key={JSON.stringify(paymentOption)}>
                {paymentOption}
              </Option>
            );
          })}
        </Select>
      </Menu.Item>
      <Menu.Item key={2}>
        <Input
          placeholder="zip code"
          value={zipValue}
          onChange={(e) => {
            setZipValue(e.target.value);
          }}
        />
        <div className="zip-container">
          <label>radius (in miles):</label>
          <Select
            placeholder="radius"
            value={zipRadius}
            onChange={(value) => {
              setZipRadius(value);
            }}>
            <Option value={5}>5</Option>
            <Option value={10}>10</Option>
            <Option value={15}>15</Option>
          </Select>
        </div>
      </Menu.Item>
      <Menu.Item key={3}>
        <Button onClick={submitFilters}>Browse</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navigation-container">
      <Search
        placeholder="Name"
        onSearch={setSearch}
        value={nameValue}
        onChange={(e) => {
          setNameValue(e.target.value);
        }}
      />

      <Dropdown
        onVisibleChange={handleVisibleChange}
        visible={menuVisible}
        overlay={menu}
        trigger={['click']}
        className="filters-dropdown"
        placement="bottomRight">
        <Button>
          Filters
          <DownOutlined />
        </Button>
      </Dropdown>
      {/* <Button
        className="new-provider"
        onClick={() => {
          props.openModal(true);
        }}>
        +
      </Button> */}
    </div>
  );
}
