import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './Navigation.css';

import { Select, Input, Button, Menu, Dropdown } from 'antd';
const { Option } = Select;
const { Search } = Input;

export default function Navigation(props) {
    const [nameValue, setNameValue] = useState('');
    const [zipValue, setZipValue] = useState('');
    const [servicesValues, setServicesValues] = useState([]);
    const [paymentValues, setPaymentValues] = useState([]);

    //https://ant.design/components/dropdown/
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuClick = (e) => {
        if (e.key === '4') {
            setMenuVisible(false);
        }
    };

    const handleVisibleChange = (flag) => {
        setMenuVisible(flag);
    };

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

    const handleSelectChange = (value, callback) => {
        let optionArray = [];
        value.map((option) => {
            optionArray.push(option.label);
        });
        callback(optionArray);
    };

    const submitFilters = () => {
        props.setFilters({
            services: servicesValues,
            zipCode: zipValue,
            paymentMethods: paymentValues
        });
    };

    const menu = (
        <Menu
            className="filters-container"
            onClick={handleMenuClick}
            style={{ width: '300px' }}>
            <Menu.Item key={1}>
                <Select
                    mode="multiple"
                    allowClear
                    showArrow
                    labelInValue
                    placeholder="Services"
                    onChange={(e) => {
                        handleSelectChange(e, setServicesValues);
                    }}>
                    {filters.services.map((service, key) => {
                        return <Option key={key}>{service}</Option>;
                    })}
                </Select>
            </Menu.Item>
            <Menu.Item key={2}>
                <Select
                    mode="multiple"
                    allowClear
                    showArrow
                    labelInValue
                    placeholder="Payment Options"
                    onChange={(e) => {
                        handleSelectChange(e, setPaymentValues);
                    }}>
                    {filters.paymentOptions.map((paymentOption, key) => {
                        return <Option key={key}>{paymentOption}</Option>;
                    })}
                </Select>
            </Menu.Item>
            <Menu.Item key={3}>
                <Input
                    placeholder="zip code"
                    onChange={(e) => {
                        setZipValue(e.target.value);
                    }}
                />
                <Select placeholder="radius"></Select>
            </Menu.Item>
            <Menu.Item key={4}>
                <Button onClick={submitFilters}>Browse</Button>
            </Menu.Item>
        </Menu>
    );

    const setSearch = () => {
        props.setSearchTerm({ name: nameValue.toLowerCase() });
    };

    return (
        <div className="navigation-container">
            <Search
                placeholder="Name"
                onSearch={setSearch}
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
