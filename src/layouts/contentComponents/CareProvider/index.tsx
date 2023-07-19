import { Content } from './Content';
import { Header } from './Header';
import PageLayout from '@/layouts/PageLayout';

const CareProvider = () => {
  return <PageLayout Header={Header} Content={Content} className="find-care" />;
};

export default CareProvider;
