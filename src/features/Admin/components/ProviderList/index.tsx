import { DeleteFilled } from '@ant-design/icons';
import { approveProvider, confirmChoice } from '../../utils/helpers';
import { ProviderObject } from '@/types';
import { useState } from 'react';
import { accessDatabase } from '@/api';

const ProviderList = ({
  providers,
  isPending
}: {
  providers: ProviderObject[];
  isPending: boolean;
}) => {
  const [providerList, setProviderList] = useState(providers);

  const removeProviderFromList = (id: number) => {
    setProviderList(providerList.filter((provider) => provider.id !== id));
  };

  return (
    <ul>
      {providerList.map((provider) => {
        return (
          <li key={provider.id}>
            <h5>{provider.name}</h5>
            <a href={`${window.location.origin}/results/${provider.id}`}>
              details
            </a>
            {isPending ? (
              <a
                onClick={async () => {
                  confirmChoice(() => {
                    approveProvider(provider.id);
                    removeProviderFromList(provider.id);
                  });
                }}>
                approve
              </a>
            ) : (
              ''
            )}
            <DeleteFilled
              className="delete-icon"
              onClick={() => {
                confirmChoice(() => {
                  accessDatabase('DELETE', 'providers', { id: provider.id });
                  removeProviderFromList(provider.id);
                });
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProviderList;
