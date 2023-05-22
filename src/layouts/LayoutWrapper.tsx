import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { EndpointPropWrapper } from '../components/App';

const LayoutWrapper: React.FC<EndpointPropWrapper> = ({ navRoutes }) => {
  const navigation = useNavigation();
  const antIcon = <LoadingOutlined spin />;

  return (
    <>
      <Header navRoutes={navRoutes} />
      {navigation.state === 'loading' ? (
        <Spin indicator={antIcon} />
      ) : (
        <Outlet />
      )}
      <Footer navRoutes={navRoutes} />
    </>
  );
};

export default LayoutWrapper;
