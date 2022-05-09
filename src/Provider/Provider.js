import './Provider.css';
import { useEffect, useState } from 'react';
import { Card, Collapse } from 'antd';
const { Panel } = Collapse;

export default function Provider(props) {
    const [providerData, setProviderData] = useState({
        providerOverview: '',
        services: [],
        certificates: [],
        paymentOptions: []
    });

    const resetState = () => {
        setProviderData({
            providerOverview: '',
            services: [],
            certificates: [],
            paymentOptions: []
        });
    };

    useEffect(async () => {
        await resetState();
        let newProviderData = { ...providerData };
        const propsToBeSorted = {
            services: props.provider.services,
            certificates: props.provider.certs,
            paymentOptions: props.provider.paymentOptions
        };

        const sortData = (providerData, type) => {
            for (const key in providerData) {
                if (type === 'services' && key === 'Open-Ended Response') {
                    newProviderData.providerOverview =
                        propsToBeSorted.services[key];
                    break;
                }
                if (
                    providerData[key] &&
                    !newProviderData[type].includes(providerData[key])
                ) {
                    newProviderData[type].push(providerData[key]);
                }
            }
        };

        for (const prop in propsToBeSorted) {
            sortData(propsToBeSorted[prop], prop);
        }

        setProviderData(newProviderData);
    }, [props]);

    return (
        <Card
            className="provider-container"
            title={props.provider.contact['Your First and Last Name']}
            headStyle={{
                backgroundColor: '#c3015c',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                color: '#f5f5f5'
            }}>
            <p className="provider-overview">{providerData.providerOverview}</p>
            <div className="provider-services">
                <label>Services:</label>
                <p>
                    {providerData.services.map((service) => {
                        return service + ' ';
                    })}
                </p>
            </div>
            <div className="provider-certs">
                <label>Certifications:</label>
                <p>
                    {providerData.certificates.map((certificate) => {
                        return certificate + ' ';
                    })}
                </p>
            </div>
            <div className="provider-payment">
                <label>Accepted Payment:</label>
                <p>
                    {providerData.paymentOptions.map((option) => {
                        return option + ' ';
                    })}
                </p>
            </div>

            <Collapse ghost>
                <Panel header="contact">
                    <div className="provider-contact">
                        <p className="provider-address">
                            {' '}
                            {/*make address formatting it's own component */}
                            {props.provider.contact['Business Address']}{' '}
                            {props.provider.contact['City/Town']},{' '}
                            {props.provider.contact['State']}{' '}
                            {props.provider.contact['Zip Code']}
                        </p>
                        <p className="provider-phone">
                            {props.provider.contact['Phone Number']}
                        </p>
                        <p className="provider-email">
                            {props.provider.contact['Work Email Address']}
                        </p>
                    </div>
                </Panel>
            </Collapse>
        </Card>
    );
}
