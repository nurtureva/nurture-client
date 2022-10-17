import {
  CarFilled,
  GlobalOutlined,
  MailOutlined,
  PhoneFilled
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import Address from '../Address/Address';

export default function ProviderDetails(props) {
  const emptyState = {
    providerOverview: '',
    services: { partial: [], other: [] },
    certifications: { partial: [], other: [] },
    paymentOptions: { partial: [], other: [] }
  };

  const [providerData, setProviderData] = useState(emptyState);

  const resetState = () => {
    setProviderData(emptyState);
  };
  useEffect(async () => {
    await resetState();
    let newProviderData = { ...providerData };
    const propsToBeSorted = {
      services: props.provider.services,
      certifications: props.provider.certifications,
      paymentOptions: props.provider.paymentOptions
    };

    const sortData = (providerData, type) => {
      for (const key in providerData) {
        if (
          !newProviderData[type].partial.some(
            (item) => item.name === providerData[key].name
          )
        ) {
          if (providerData[key].name === 'Other') {
            newProviderData[type].other.push(providerData[key]);
          } else {
            newProviderData[type].partial.push(providerData[key]);
          }
        }
      }
    };

    for (const prop in propsToBeSorted) {
      sortData(propsToBeSorted[prop], prop);
    }
    newProviderData.providerOverview = props.provider.overview;
    setProviderData(newProviderData);
  }, [props]);

  const renderAddress = (provider) => {
    return (
      <address className="provider-contact">
        <label>Contact</label>

        {provider.website && (
          <div className="website">
            <GlobalOutlined />
            <a href={provider.website} className="provider-website">
              {provider.website}
            </a>
          </div>
        )}

        {provider.email && (
          <div className="email">
            <MailOutlined />
            <a href={`mailto:${provider.email}`} className="provider-email">
              {provider.email}
            </a>
          </div>
        )}
        {provider.phone && (
          <div className="phone">
            <PhoneFilled />
            <a href={`tel:+${provider.phone}`} className="provider-phone">
              {provider.phone}
            </a>
          </div>
        )}
        {provider.address_1 && (
          <div className="address">
            <CarFilled />
            <Address provider={provider} />
          </div>
        )}
      </address>
    );
  };

  const renderList = (categoryList, title, className) => {
    // Accepted Payment
    return (
      <div>
        <label>{title}:</label>
        <ul className={className}>
          {categoryList.map((option) => {
            return <li key={option.id}>{option.name}</li>;
          })}
        </ul>
      </div>
    );
  };

  const renderFullList = (categoryList, title, className) => {
    const { partial, other } = categoryList;
    const fullList = [...partial, ...other];

    return renderList(fullList, title, className);
  };

  if (props.view === 'full') {
    return (
      <>
        <p className="provider-overview">{providerData.providerOverview}</p>
        {renderFullList(providerData.services, 'Services')}
        {renderFullList(
          providerData.paymentOptions,
          'Accepted Payment',
          'provider-payment'
        )}
        {renderFullList(providerData.certifications, 'Certifications')}
        {renderAddress(props.provider)}
      </>
    );
  }
  return (
    <>
      {renderList(providerData.services.partial, 'Services')}
      {renderList(
        providerData.paymentOptions.partial,
        'Accepted Payment',
        'provider-payment'
      )}
      {renderAddress(props.provider)}
    </>
  );
}
