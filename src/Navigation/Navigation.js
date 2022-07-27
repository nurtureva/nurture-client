import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './Navigation.css';

import { Select, Input, Button, Menu, Dropdown } from 'antd';
const { Option } = Select;
const { Search } = Input;

/**
 * Component to house all the filtering/navigating of data
 *
 * It renders a search bar for names, as well as a drop down menu for filters.
 * Filters being: service offered, payment options, zip code in a radius
 *
 * @component
 * @example
 * const updateFilters = () => {//function that updates the filter object in app state}
 * const setSearchTerm = () => {//function that updates search term in app state}
 * return (
 *     <Navigation updateFilters = {updateFilters} setSearchTerm = {setSearchTerm} />
 * )
 *
 */
export default function Navigation(props) {
  const [nameValue, setNameValue] = useState('');
  const [zipValue, setZipValue] = useState('');
  const [zipRadius, setZipRadius] = useState(5);
  const [servicesValues, setServicesValues] = useState([]);
  const [paymentValues, setPaymentValues] = useState([]);
  const [filters, setFilters] = useState({
    services: [],
    paymentOptions: [] //these will be an array from database in the format of: [{name: paymentName1, id:1 },{name: paymentName2, id:2}]
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

  const clearForm = () => {
    setPaymentValues([]);
    setServicesValues([]);
    setZipValue('');
  };

  //when the component first loads we get all service and payment options from the database, and set those to state.
  useState(async () => {
    const services = await getServices();
    const paymentOptions = await getPaymentOptions();
    setFilters({ services, paymentOptions });
  }, []);

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
  //end of antd code

  /**
   * this function sends a submitted search term to app state, triggering the filter providers function
   */
  const setSearch = () => {
    //clear the search bar value
    setNameValue('');
    props.setSearchTerm({ name: nameValue.toLowerCase() });
  };

  /**
   * this function sends a submitted filter object to app state, triggering the filter providers function
   *
   * it builds a "filter object" based on values in form
   * @example
   * {
   *   services: [{ name: 'Doula Support', id:1 }],
   *   paymentOptions: [{name: 'FAMIS', id: 5},
   *                    {name:'Fee for Service', id:1}],
   *   zipCode: {value: 23229, radius: 5}
   * }
   */
  const submitFilters = () => {
    const updateData = {};
    if (servicesValues.length) {
      updateData.services = servicesValues.map((option) => {
        return { name: option.label, id: option.value };
      });
    }
    if (paymentValues.length) {
      updateData.paymentOptions = paymentValues.map((option) => {
        return { name: option.label, id: option.value };
      });
    }
    if (zipValue) {
      updateData.zipCode = { value: zipValue, radius: zipRadius };
    }
    props.updateFilters(updateData);

    clearForm();
  };

  /**
   * this is the real meat and potatoes of the component. it's where all our selects are hidden.
   * we keep it this menu var for the dropdown component
   */
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
            return (
              <Option value={service.id} key={service.id}>
                {service.name}
              </Option>
            );
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
              <Option value={paymentOption.id} key={paymentOption.id}>
                {paymentOption.name}
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
    </div>
  );
}
