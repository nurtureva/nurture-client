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
    name: '',
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
    newProviderData.name = props.provider.name;
    setProviderData(newProviderData);
  }, [props]);

  const renderContact = (provider) => {
    return (
      <>
        <div className="provider-contact">
          {provider.phone && (
            <div className="phone">
              <a href={`tel:+${provider.phone}`} className="provider-phone">
                <PhoneFilled />
              </a>
            </div>
          )}
          {provider.email && (
            <div className="email">
              <a href={`mailto:${provider.email}`} className="provider-email">
                <MailOutlined />
              </a>
            </div>
          )}
        </div>
        <div className="website">
          {provider.website && (
            <Button
              type="primary"
              shape="round"
              icon={<GlobalOutlined />}
              href={provider.website}
              size="medium">
              Go to their Website
            </Button>
          )}
        </div>
        {provider.address_1 && (
          <div className="address">
            <CarFilled />
            <Address provider={provider} />
          </div>
        )}
      </>
    );
  };

  const renderFullContact = (provider) => {
    return (
      <>
        <div className="provider-contact">
          {provider.phone && (
            <div className="phone">
              <a href={`tel:+${provider.phone}`} className="provider-phone">
                <PhoneFilled />
              </a>
            </div>
          )}
          {provider.email && (
            <div className="email">
              <a href={`mailto:${provider.email}`} className="provider-email">
                <MailOutlined />
              </a>
            </div>
          )}
        </div>
        <div className="website">
          {provider.website && (
            <Button
              type="primary"
              shape="round"
              icon={<GlobalOutlined />}
              href={provider.website}
              size="medium">
              Go to their Website
            </Button>
          )}
        </div>
        {provider.address_1 && (
          <div className="address">
            <CarFilled />
            <Address provider={provider} />
          </div>
        )}
      </>
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

  const photoList = [
    'https://nurture-provider-photos.s3.amazonaws.com/profile-1.png',
    'https://nurture-provider-photos.s3.amazonaws.com/profile-2.png'
  ];

  const logoList = [
    'https://nurture-provider-photos.s3.amazonaws.com/sample-logo-2.png',
    'https://nurture-provider-photos.s3.amazonaws.com/nurture-logo-1.png',
    'https://nurture-provider-photos.s3.amazonaws.com/nurture-logo-2.jpg'
  ];

  if (props.view === 'full') {
    return (
      <div className="details-view">
        <div className="very-top">
          <Button
            onClick={() => {
              window.history.back();
            }}>
            back
          </Button>
          <div className="logo">
            <img
              className="logo"
              src={logoList[Math.floor(Math.random() * logoList.length)]}
            />
          </div>
        </div>
        <div className="top-left">
          <span className="provider-photo">
            <img
              src={photoList[Math.floor(Math.random() * photoList.length)]}
            />
          </span>
        </div>
        <div className="top-middle">
          <h3>{providerData.name}</h3>
          <p className="provider-overview">{providerData.providerOverview}</p>
        </div>
        <div className="top-right">{renderFullContact(props.provider)}</div>
        <div className="bottom">
          {renderFullList(
            providerData.services,
            'Services',
            'provider-services'
          )}
          {renderFullList(
            providerData.paymentOptions,
            'Accepted Payment',
            'provider-payment'
          )}
          {renderFullList(
            providerData.certifications,
            'Certifications',
            'provider-certifications'
          )}
        </div>
      </div>
    );
  }
  return (
    <>
      <h3>{providerData.name}</h3>
      <span className="provider-photo">
        <img src={photoList[Math.floor(Math.random() * photoList.length)]} />
      </span>
      {renderContact(props.provider)}
      {renderList(providerData.services.partial, 'Services')}
      {renderList(
        providerData.paymentOptions.partial,
        'Accepted Payment',
        'provider-payment'
      )}
    </>
  );
}
