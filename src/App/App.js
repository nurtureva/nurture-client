import 'antd/dist/antd.css';
import './App.css';
import ProviderTable from '../ProviderTable/ProviderTable';
import Navigation from '../Navigation/Navigation';
import ActiveFilters from '../ActiveFilters/ActiveFilters';
import React, { useState, useEffect } from 'react';
//UI components
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
    const [providers, setProviders] = useState([]);
    const [visibleProviders, setVisibleProviders] = useState([]);
    const [filters, setFilters] = useState({
        //pass setfilters to header, then when these filters change
        services: [], //get these filters from table (maybe make new column section for available filters)
        paymentOptions: [],
        zipCode: ''
    });

    const [searchTerm, setSearchTerm] = useState({
        name: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    async function getProviders() {
        const providers = await fetch(
            `${
                process.env.NODE_ENV === 'development'
                    ? 'http://localhost:5000/providers'
                    : 'https://nurture-server.herokuapp.com/providers'
            }`,
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
        let newProviders = [...providers];
        newProviders = newProviders.filter((provider) => {
            const providerName = provider.contact['Your First and Last Name'];
            if (!providerName) return false;
            return providerName.toLowerCase().includes(searchTerm.name);
        });

        setVisibleProviders(newProviders);
    }, [searchTerm]);

    useEffect(() => {
        let newProviders = [...providers];
        newProviders = newProviders.filter((provider) => {
            //filters, providers,

            let zipCheck = true;
            let serviceCheck = true;
            let paymentCheck = true;

            if (filters.zipCode) {
                zipCheck = provider.contact['Zip Code']
                    ? provider.contact['Zip Code'].includes(filters.zipCode)
                    : false;
            }

            const checkMultiple = (activeFilters, providerValues) => {
                let evaluator = false;
                for (const value of providerValues) {
                    for (const option of activeFilters) {
                        evaluator = value.includes(option);
                        if (evaluator) {
                            //remove filter from the activeFilters search array since we found it
                            const index = activeFilters.indexOf(option);
                            activeFilters.splice(index, 1);
                            //then if there are no more services to look for, break out of the loop
                            if (!activeFilters.length) break;
                            //otherwise set serviceCheck to false to keep looking
                            evaluator = false;
                        }
                    }
                    if (evaluator) break;
                }
                return evaluator;
            };

            if (filters.services.length) {
                serviceCheck = checkMultiple(
                    [...filters.services],
                    Object.values(provider.services)
                );
            }

            if (filters.paymentMethods.length) {
                paymentCheck = checkMultiple(
                    [...filters.paymentMethods],
                    Object.values(provider.paymentOptions)
                );
            }
            return zipCheck && serviceCheck && paymentCheck;
        });
        setVisibleProviders(newProviders);
    }, [filters]);

    useEffect(async () => {
        try {
            const res = await getProviders();
            setProviders(res);
            setVisibleProviders(res);
        } catch (err) {
            console.log(err);
            setError(true);
        }
        setLoading(false);
    }, []);

    const render = () => {
        if (error) {
            return <p>There was an error please try again...</p>;
        }
        const antIcon = <LoadingOutlined spin />;
        return loading ? (
            <Spin indicator={antIcon} />
        ) : (
            <div className="nurture-directory-main-container">
                <div className="header"></div>
                <Navigation
                    setFilters={setFilters}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                />
                <ActiveFilters searchTerm={searchTerm} filters={filters} />
                <div className="current-filters"></div>
                <ProviderTable providers={visibleProviders} />
            </div>
        );
    };

    return render();
}

export default App;
