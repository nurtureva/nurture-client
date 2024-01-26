import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Footer, Header } from '@/components';
import { EndpointPropWrapper } from '@/types';
import { SponsorsSection } from '@/components/SponsorsSection';

const LayoutWrapper: React.FC<EndpointPropWrapper> = ({ navRoutes }) => {
  const navigation = useNavigation();
  const antIcon = <LoadingOutlined spin />;

  return (
    <>
      <ScrollRestoration />
      <Header navRoutes={navRoutes} />
      {navigation.state === 'loading' ? (
        <Spin indicator={antIcon} />
      ) : (
        <Outlet />
      )}
      <SponsorsSection />
      <Footer navRoutes={navRoutes} />
    </>
  );
};

export default LayoutWrapper;
