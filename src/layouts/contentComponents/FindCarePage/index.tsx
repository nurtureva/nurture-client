import { Content } from './Content';
import { Header } from './Header';
import './findCare.scss';
import PageLayout from '@/layouts/PageLayout';

const FindCare = () => (
  <PageLayout Header={Header} Content={Content} className="find-care" />
);
export default FindCare;
