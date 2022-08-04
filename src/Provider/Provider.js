import './Provider.css';
import Address from './Address/Address';
import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Modal } from 'antd';
import {
  PhoneFilled,
  CarFilled,
  MailOutlined,
  GlobalOutlined
} from '@ant-design/icons';

export default function Provider(props) {
  const emptyState = {
    providerOverview: '',
    services: { partial: [], other: [] },
    certifications: { partial: [], other: [] },
    paymentOptions: { partial: [], other: [] }
  };
  const [providerData, setProviderData] = useState(emptyState);

  const [isProviderOpen, setIsProviderOpen] = useState(false);

  const resetState = () => {
    setProviderData(emptyState);
  };

  const openProvider = (e) => {
    setIsProviderOpen(true);
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

  const renderAddress = () => {
    return (
      <address className="provider-contact">
        <label>Contact</label>

        {props.provider.website && (
          <div className="website">
            <GlobalOutlined />
            <a href={props.provider.website} className="provider-website">
              {props.provider.website}
            </a>
          </div>
        )}

        {props.provider.email && (
          <div className="email">
            <MailOutlined />
            <a
              href={`mailto:${props.provider.email}`}
              className="provider-email">
              {props.provider.email}
            </a>
          </div>
        )}
        {props.provider.phone && (
          <div className="phone">
            <PhoneFilled />
            <a href={`tel:+${props.provider.phone}`} className="provider-phone">
              {props.provider.phone}
            </a>
          </div>
        )}
        {props.provider.address_1 && (
          <div className="address">
            <CarFilled />
            <Address provider={props.provider} />
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

  return (
    <Card
      className="provider-container"
      title={props.provider.name}
      headStyle={{
        backgroundColor: '#c4d7ca',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      }}>
      {renderList(providerData.services.partial, 'Services')}
      {renderList(
        providerData.paymentOptions.partial,
        'Accepted Payment',
        'provider-payment'
      )}
      {renderAddress()}
      <Button type="text" onClick={openProvider}>
        view more...
      </Button>

      <Modal
        title={props.provider.name}
        visible={isProviderOpen}
        width={'90%'}
        footer={null}
        onCancel={() => {
          setIsProviderOpen(false);
        }}>
        <p className="provider-overview">{providerData.providerOverview}</p>
        {renderFullList(providerData.services, 'Services')}
        {renderFullList(
          providerData.paymentOptions,
          'Accepted Payment',
          'provider-payment'
        )}
        {renderFullList(providerData.certifications, 'Certifications')}
        {renderAddress()}
      </Modal>
    </Card>
  );
}
