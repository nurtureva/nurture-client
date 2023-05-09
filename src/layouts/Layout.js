import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Layout() {
  const navigation = useNavigation();
  const antIcon = <LoadingOutlined spin />;

  return (
    <>
      <Header />
      {navigation.state === 'loading' ? (
        <Spin indicator={antIcon} />
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}
