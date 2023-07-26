import { Button } from '@/components';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <span>
        <h2>Join the Birth and Early Parenting Resource Directory!</h2>
        <p>
          List your practice in this directory for free! Help new and expecting
          parents find and hire you.
        </p>
        <Button type="primary" to="/provider-form">
          List your practice
        </Button>
        {/* <Link to="" className="link-button">
          Update your listing
        </Link> */}
      </span>
    </>
  );
};
