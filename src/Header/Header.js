import { Button, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import NurtureModal from '../NurtureModal/NurtureModal';

export default function Header(props) {
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [isNewProviderModal, setIsNewProviderModal] = useState(false);

  const closeModal = () => {
    setIsNewProviderModal(false);
  };

  const openModal = () => {
    setIsNewProviderModal(true);
  };

  const submitComment = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/comment`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment })
    });
    setIsCommentModal(false);
  };
  return (
    <div className="header">
      <img src="https://nurture-provider-photos.s3.amazonaws.com/nurture-logo-2.jpg" />

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
        <TextArea
          placeholder="leave your comment here..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </Modal>
      <NurtureModal
        isModal={isNewProviderModal}
        template={props.template}
        closeModal={closeModal}></NurtureModal>
    </div>
  );
}
