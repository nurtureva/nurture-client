import React, { useEffect, useState } from 'react';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import './Navigation.scss';

import { Select, Input, Button, Menu, Dropdown, Checkbox, Slider } from 'antd';
import DropdownWrapper from './FilterDropdown/FilterDropdown';
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
  const [searchValue, setSearchValue] = useState('');
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

  useEffect(() => {
    submitFilters();
  }, [servicesValues, paymentValues]);

  const clearForm = () => {
    setPaymentValues([]);
    setServicesValues([]);
    props.clearSearch();
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
    const isZip = (val) => /^\d{5}-\d{4}$|^\d{5}$/.test(val);
    const searchParam = isZip(searchValue) ? 'zip' : 'name';
    //clear the search bar value
    setSearchValue('');
    props.updateSearch(searchParam, searchValue.toLowerCase());
    // props.setSearchTerm({ [searchParam]: searchValue.toLowerCase() });
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
    updateData.services = servicesValues.map((option) => {
      return { id: option };
    });

    updateData.paymentOptions = paymentValues.map((option) => {
      return { id: option };
    });

    if (zipValue) {
      updateData.zipCode = { value: zipValue, radius: zipRadius };
    }

    props.updateFilters(updateData);
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
            console.log(value);
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
  const serviceChecklistOptions = filters.services.map((service) => {
    return { label: service.name, value: service.id };
  });
  const paymentChecklistOptions = filters.paymentOptions.map(
    (paymentOption) => {
      return {
        label: paymentOption.name,
        value: paymentOption.id,
        key: paymentOption.id
      };
    }
  );
  const radiusMenu = (
    <Menu>
      <Menu.Item>
        <label>Radius (in miles)</label>
        <span className="slider-wrapper">
          <Slider
            value={props.searchTerm.zip}
            onChange={(value) => {
              props.updateSearch('radius', value);
            }}
            min={1}
            max={20}
          />
          {zipRadius}
        </span>
        <Button
          size="small"
          onClick={() => {
            props.updateSearch('zip', '');
          }}>
          clear
        </Button>
      </Menu.Item>
    </Menu>
  );
  const serviceMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          options={serviceChecklistOptions}
          value={servicesValues}
          onChange={(values) => {
            setServicesValues(values);
          }}
        />
      </Menu.Item>
    </Menu>
  );
  const paymentMenu = (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          className={paymentValues.length ? 'active' : ''}
          options={paymentChecklistOptions}
          value={paymentValues}
          onChange={(values) => {
            console.log(values);
            setPaymentValues(values);
          }}
        />
      </Menu.Item>
    </Menu>
  );
  /**
   *
   *
   *
   * NOTES FOR MONDAY 11-something
   * make a dropdown filter choice for each filter option
   * then add styling to match phsycologytoday.com
   * rework and potentially merge activeFilters module with this one
   *
   * THEN
   *
   * if search query is a number, search for zip code. Otherwise, search for a name.
   * is zip is an active filter then add it with other ones.
   *
   *
   *
   * * */
  return (
    <div className="navigation-container">
      <Search
        className="search-bar"
        placeholder="Name or Zip Code"
        onSearch={setSearch}
        value={searchValue}
        allowClear
        size="large"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <div className="filters-container">
        <DropdownWrapper
          menu={serviceMenu}
          body={
            <Button>
              Services
              <DownOutlined />
            </Button>
          }
          active={servicesValues.length ? true : false}
        />
        <DropdownWrapper
          menu={paymentMenu}
          body={
            <Button>
              Payment Accepted
              <DownOutlined />
            </Button>
          }
          active={paymentValues.length ? true : false}
        />
        {props.searchTerm.name ? (
          <Button
            className="filters-dropdown active"
            onClick={() => {
              props.updateSearch('name', '');
            }}>
            Name: {props.searchTerm.name}
            <CloseOutlined />
          </Button>
        ) : (
          ''
        )}
        {props.searchTerm.zip ? (
          <Button
            className="filters-dropdown active"
            onClick={() => {
              props.updateSearch('zip', '');
            }}>
            Zip: {props.searchTerm.zip}
            <CloseOutlined />
          </Button>
        ) : (
          ''
        )}
        {servicesValues.length ||
        paymentValues.length ||
        props.searchTerm.name ||
        props.searchTerm.zip ? (
          <Button className="filters-dropdown" onClick={clearForm}>
            Clear all filters
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
