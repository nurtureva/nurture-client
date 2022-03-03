import './Provider.css'
import { useEffect, useState } from 'react';
import { Card, Collapse } from 'antd';
const { Panel } = Collapse;

export default function Provider(props) {

    const [providerData, setProviderData] = useState({
        providerOverview: '',
        services: [],
        certificates: []
    });

    useEffect(() => {
        let newProviderData = {...providerData};
        const providerServices = props.provider.services;
        const providerCerts = props.provider.certs;

        const sortData = (prop, type) => {
            for (const key in prop) {
                if ((type === 'services') && (key === 'Open-Ended Response')) {
                    newProviderData.providerOverview = providerServices[key];
                    break;
                }
                if(prop[key]) {
                    newProviderData[type].push(prop[key]);
                }
            }
        }
        sortData(providerServices, 'services')
        sortData(providerCerts, 'certificates')
        setProviderData(newProviderData)
    }, [])

    return(
        <Card className='provider-container' title={props.provider.contact['Your First and Last Name']}>
            <p className='provider-overview'>{providerData.providerOverview}</p>
            <div className='provider-services'>
                <label>
                    Services:
                </label>
                <p>
                    {providerData.services.map(service => {
                        return service + " "
                    })} 
                </p>
            </div>
            <div className='provider-certs'>
                <label>
                    Certifications:
                </label>
                <p>
                    {providerData.certificates.map(certificate => {
                        return certificate + " "
                    })}
                </p>
            </div>
            
            <Collapse ghost>
                <Panel header="contact">
                    <div className='provider-contact'>
                        <p className='provider-address'> {/*make address formatting it's own component */}
                            {props.provider.contact['Business Address']} {props.provider.contact['City/Town']}, {props.provider.contact['State']} {props.provider.contact['Zip Code']}
                        </p>
                        <p className='provider-phone'>
                            {props.provider.contact['Phone Number']}
                        </p>
                        <p className='provider-email'>
                            {props.provider.contact['Work Email Address']}
                        </p>
                    </div>
                </Panel>
            </Collapse>
        </Card>
    )
}