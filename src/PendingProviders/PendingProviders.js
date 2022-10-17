import { Button, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import ProviderDetails from '../Provider/ProviderDetails/ProviderDetails';
import './PendingProviders.css';

export default function PendingProviders(props) {
  const initialModalVisibility = {
    approveConfirmation: false,
    details: false
  };
  const [activeProvider, setActiveProvider] = useState();
  const [modalVisibility, setModalVisibility] = useState(
    initialModalVisibility
  );

  const resetModalVisibility = () => {
    setModalVisibility(initialModalVisibility);
  };

  const closeModal = () => {
    resetModalVisibility();
    setActiveProvider(undefined);
  };

  const renderPendingProvidersTable = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (_, { ref: provider }) => {
          return (
            <div className="admin-actions-cell">
              <a
                onClick={() => {
                  setActiveProvider(provider);
                  modalVisibility.details = true;
                }}>
                details
              </a>
              <a
                onClick={async () => {
                  setActiveProvider(provider);
                  modalVisibility.approveConfirmation = true;
                }}>
                approve
              </a>
              {/* open modal that asks for confirmation, then approve provider */}
            </div>
          );
        }
      }
    ];
    const data = props.pendingProviders.map((provider) => {
      return { key: provider.id, name: provider.name, ref: provider };
    });

    return (
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 240 }}
      />
    );
  };

  useEffect(() => {
    if (modalVisibility.approveConfirmation) {
      confirmProviderApproval();
    }
  }, [modalVisibility.approveConfirmation]);

  const confirmProviderApproval = () => {
    return Modal.confirm({
      title: `Are you sure ${activeProvider?.name}'s information is correct?`,
      width: '90%',
      okText: 'Yes',
      cancelText: 'No',
      onCancel: () => {
        closeModal();
      },
      onOk: async () => {
        const result = await fetch(
          `${process.env.REACT_APP_BASE_URL}/providers/${activeProvider.id}`,
          {
            method: 'PATCH',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              patchBody: {
                needs_review: false
              }
            })
          }
        );
        const providerIndex = props.pendingProviders.findIndex(
          (provider) => provider.id === activeProvider.id
        );
        props.pendingProviders.splice(providerIndex, 1);

        closeModal();
      }
    });
  };

  return (
    <>
      <div>
        <label>pending providers</label>

        {renderPendingProvidersTable()}
      </div>
      <Modal
        title={activeProvider?.name}
        visible={!!modalVisibility.details}
        width={'90%'}
        footer={null}
        onCancel={() => {
          closeModal();
        }}>
        <ProviderDetails provider={activeProvider} view={'full'} />
      </Modal>
    </>
  );
}
