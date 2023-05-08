import ProviderTable from '../../components/Provider/layouts/ProviderTable';
import { useOutletContext } from 'react-router-dom';

export default function Results() {
  const { filteredProviders: providers } = useOutletContext();

  return (
    <>
      <ProviderTable providers={providers} />
    </>
  );
}
