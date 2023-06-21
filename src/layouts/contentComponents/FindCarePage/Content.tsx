import OptionCenter from '@/components/OptionCenter/OptionCenter';
import { Link } from 'react-router-dom';

export const Content = () => {
  return (
    <>
      <section className="bg-yellow">
        <h2>Our main categories of care:</h2>
        <OptionCenter />
        <span>
          <h3>Not ready to narrow down your search?</h3>
          <Link className="secondary-button" to="/results">
            See all care providers
          </Link>
        </span>
      </section>
    </>
  );
};
