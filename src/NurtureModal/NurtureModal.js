import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import NewProviderForm from '../NewProviderForm/NewProviderForm';

export default function NurtureModal(props) {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    setConfirmed(false);
  }, [props.isModal]);
  const renderConfirmed = () => {
    return (
      <div>
        Thanks for submitting your information! Your information will be
        reviewed shortly.
      </div>
    );
  };

  const submitForm = (callback) => {
    callback();
  };
  const footer = confirmed
    ? [
        <Button type="primary" onClick={props.closeModal}>
          OK
        </Button>
      ]
    : null;
  return (
    <Modal
      title="New Provider Form"
      visible={props.isModal}
      width={'90%'}
      onCancel={props.closeModal}
      footer={footer}>
      {confirmed ? (
        renderConfirmed()
      ) : (
        <NewProviderForm
          setConfirmed={setConfirmed}
          submitForm={submitForm}
          {...props}></NewProviderForm>
      )}
    </Modal>
  );
}
