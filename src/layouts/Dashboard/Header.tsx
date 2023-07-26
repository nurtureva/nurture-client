import splashImage from '@/assets/images/dashboard-splash.png';
import { Card } from '@/components/Card/Card';
import { Button } from '@/components/Button/Button';

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
          <Button type="primary" to="/results">
            Find Care
          </Button>
          <Button type="secondary" to="/provider-home">
            I'm a Care Provider
          </Button>
        </Card>
        <img src={splashImage} />
      </span>
    </>
  );
};
