import PageLayout from '@/layouts/PageLayout';
import { Header } from './Header';
import { Content } from './Content';
import './dashboard.scss';

const Dashboard = () => {
  return <PageLayout Header={Header} Content={Content} className="dashboard" />;
};

export default Dashboard;
