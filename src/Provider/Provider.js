import './Provider.css';
import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Modal } from 'antd';
import { PhoneFilled, CarFilled, MailOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

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
          providerData[key] &&
          !newProviderData[type].partial.includes(providerData[key])
        ) {
          if (key === 'Other') {
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
    newProviderData.providerOverview = props.provider.contact['Overview'];
    setProviderData(newProviderData);
  }, [props]);

  const renderAddress = () => {
    return (
      <address className="provider-contact">
        <label>Contact</label>
        <div className="email">
          <MailOutlined />
          <a
            href={`mailto:${props.provider.contact['Email']}`}
            className="provider-email">
            {props.provider.contact['Email']}
          </a>
        </div>
        <div className="phone">
          <PhoneFilled />
          <a
            href={`tel:+${props.provider.contact['Phone']}`}
            className="provider-phone">
            {props.provider.contact['Phone']}
          </a>
        </div>
        <div className="address">
          <CarFilled />
          <a className="provider-address">
            {/*make address formatting it's own component */}
            {`${props.provider.contact['Address 1']} ${props.provider.contact['Address 2']} 
              ${props.provider.contact['City']} ${props.provider.contact['State']} 
              ${props.provider.contact['Zip Code']}`}
          </a>
        </div>
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
            return <li>{option}</li>;
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
      title={props.provider.contact['Name']}
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
        title={props.provider.contact['Name']}
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
