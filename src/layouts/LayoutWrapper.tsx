import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Endpoint } from '../components/App';

export default function LayoutWrapper({ navPaths }: { navPaths: Endpoint[] }) {
  const navigation = useNavigation();
  const antIcon = <LoadingOutlined spin />;

  return (
    <>
      <Header navPaths={navPaths} />
      {navigation.state === 'loading' ? (
        <Spin indicator={antIcon} />
      ) : (
        <Outlet />
      )}
      <Footer navPaths={navPaths} />
    </>
  );
}
