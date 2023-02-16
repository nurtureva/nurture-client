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
    );
  };

  const renderWesbite = (provider) => {
    return (
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
    );
  };

  const renderAddress = (provider) => {
    //empty values from the db are 'null'. null doesn't get replaced with destructuring defaults (only undefined does)
    const address_1 = props.provider.address_1 || '';
    const address_2 = props.provider.address_2 || '';
    const city = props.provider.city || '';
    const state = props.provider.state || '';
    const zip = props.provider.zip || '';
    return (
      <div className="address">
        {provider.address_1 && (
          <Button
            type="primary"
            shape="round"
            icon={<CarFilled />}
            href={`https://www.google.com/maps/search/${address_1} ${address_2} ${
              city ? city + ',' : ''
            } ${state} ${zip}`}
            size="medium">
            Go to their Location
          </Button>
        )}
      </div>
    );
  };

  const renderName = () => {
    return (
      <div className="name">
        <h3>{providerData.name}</h3>
      </div>
    );
  };

  const renderOverview = () => {
    return <p className="provider-overview">{providerData.providerOverview}</p>;
  };

  const renderList = (categoryList, title, className) => {
    const { partial, other } = categoryList;
    const fullList = [...partial, ...other];

    return (
      <div>
        <label>{title}:</label>
        <ul className={className}>
          {fullList.map((option) => {
            return <li key={option.id}>{option.name}</li>;
          })}
        </ul>
      </div>
    );
  };

  const renderBackButton = () => {
    return (
      <div className="back">
        <Button
          onClick={() => {
            window.history.back();
          }}>
          back
        </Button>
      </div>
    );
  };

  const photoList = [
    'https://nurture-provider-photos.s3.amazonaws.com/profile-1.png',
    'https://nurture-provider-photos.s3.amazonaws.com/profile-2.png'
  ];

  const logoList = [
    'https://nurture-provider-photos.s3.amazonaws.com/sample-logo-2.png',
    'https://nurture-provider-photos.s3.amazonaws.com/sample-logo-1.png'
  ];

  const renderPhoto = () => {
    return (
      <span className="provider-photo">
        <img src={photoList[Math.floor(Math.random() * photoList.length)]} />
      </span>
    );
  };

  const renderLogo = () => {
    return (
      <span className="logo">
        <img src={logoList[Math.floor(Math.random() * logoList.length)]} />
      </span>
    );
  };

  if (props.view === 'full') {
    return (
      <div className="details-view">
        <span className="provider-header">
          {renderBackButton()}
          {renderLogo()}
        </span>
        {renderPhoto()}
        <span className="provider-description">
          {renderName()}
          {renderOverview()}
        </span>
        <span className="provider-resources">
          {renderContact(props.provider)}
          {renderAddress(props.provider)}
          {renderWesbite(props.provider)}
        </span>
        <span className="provider-info">
          {renderList(providerData.services, 'Services', 'provider-services')}
          {renderList(
            providerData.paymentOptions,
            'Accepted Payment',
            'provider-payment'
          )}
          {renderList(
            providerData.certifications,
            'Certifications',
            'provider-certifications'
          )}
        </span>
        {/* <div className="very-top">
          
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
        </div> */}
      </div>
    );
  }
  return (
    <div className="list-view">
      <span className="left">{renderPhoto()}</span>
      <span className="middle">{renderName()}</span>

      {renderContact(props.provider)}
      {renderWesbite(props.provider)}
    </div>
  );
}
