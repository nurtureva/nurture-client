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
    'https://photos.psychologytoday.com/ea525307-2554-4da1-8aeb-34a524253d5f/2/320x400.jpeg',
    'https://photos.psychologytoday.com/a8e44405-f458-467a-b574-6d03313f4e36/2/320x400.jpeg',
    'https://photos.psychologytoday.com/27e04795-8344-4d26-a74d-47ee3b0f0d4a/1/320x400.png',
    'https://photos.psychologytoday.com/4b4bc420-46cd-11ea-a6ad-06142c356176/2/320x400.jpeg',
    'https://photos.psychologytoday.com/4b4bc420-46cd-11ea-a6ad-06142c356176/2/320x400.jpeg',
    'https://photos.psychologytoday.com/7abf6d0d-410f-4ea4-937f-892baf780bf3/1/320x400.jpeg',
    'https://photos.psychologytoday.com/4511d9d1-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg',
    'https://photos.psychologytoday.com/4a3d9f3b-46cd-11ea-a6ad-06142c356176/3/320x400.jpeg',
    ''
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
              src="https://thediversedoula.com/wp-content/uploads/2021/10/IMG_7494-240x59.png"
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
