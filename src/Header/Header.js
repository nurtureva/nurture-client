import { Button, Form, Modal, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import NurtureModal from '../NurtureModal/NurtureModal';

export default function Header(props) {
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState('');
  const [isNewProviderModal, setIsNewProviderModal] = useState(false);

  const closeModal = () => {
    setIsNewProviderModal(false);
  };

  const openModal = () => {
    setIsNewProviderModal(true);
  };

  const submitComment = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/upload`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ photo })
    });
    setIsCommentModal(false);
  };
  return (
    <div className="header">
      <img src="https://nurture-provider-photos.s3.amazonaws.com/nurture-logo-1.png" />

      <span className="header-forms">
        <Button onClick={openModal} type="text">
          New Provider?
        </Button>
        <Button
          onClick={() => {
            setIsCommentModal(true);
          }}
          type="text">
          Comments?
        </Button>
      </span>
      <Modal
        title="Comment Form"
        visible={isCommentModal}
        width={'90%'}
        footer={[
          <Button type="primary" onClick={submitComment}>
            Submit
          </Button>
        ]}
        onCancel={() => {
          setIsCommentModal(false);
        }}>
        <Test />
      </Modal>
      <NurtureModal
        isModal={isNewProviderModal}
        template={props.template}
        closeModal={closeModal}></NurtureModal>
    </div>
  );
}

function Test(props) {
  return <Form></Form>;
}
