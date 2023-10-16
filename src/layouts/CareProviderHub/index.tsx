import './careProviderHub.scss';
import { Content } from './CareProviderHub';
import PageLayout from '@/layouts/PageLayout';

const CareProvider = () => {
  return <PageLayout Content={Content} className="care-provider-hub" />;
};

export default CareProvider;
