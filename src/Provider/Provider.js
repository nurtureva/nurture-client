import './Provider.css';
import { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import ProviderDetails from './ProviderDetails/ProviderDetails';

export default function Provider(props) {
  const [isProviderOpen, setIsProviderOpen] = useState(false);

  const openProvider = (e) => {
    setIsProviderOpen(true);
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
      <ProviderDetails provider={props.provider} />
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
        <ProviderDetails provider={props.provider} view={'full'} />
      </Modal>
    </Card>
  );
}
