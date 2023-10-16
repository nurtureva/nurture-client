import './dashboard.scss';
import PageLayout from '@/layouts/PageLayout';
import { Content } from './Dashboard';

const Dashboard = () => {
  return <PageLayout Content={Content} className="dashboard" />;
};

export default Dashboard;
