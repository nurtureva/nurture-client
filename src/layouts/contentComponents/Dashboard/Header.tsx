import { Link } from 'react-router-dom';
import splashImage from '@/assets/dashboard-splash.png';
import { Card } from '@/features/UI/components/Card/Card';

export const Header = () => {
  return (
    <>
      <h1>Birth and Early Parenting Resource Directory</h1>
      <span>
        <Card color="--off-white">
          <h2>Welcome to community-centered care for all</h2>
          <p>
            One or two sentences explaining what this directory is an why it
            exists
          </p>
          <Link className="primary-button" to="/find-care">
            Find Care
          </Link>
          <Link className="secondary-button" to="/provider-home">
            I'm a Care Provider
          </Link>
        </Card>
        <img src={splashImage} />
      </span>
    </>
  );
};
