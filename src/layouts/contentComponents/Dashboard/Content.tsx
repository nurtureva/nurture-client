import { default as OptionCenter } from '@/components/OptionCenter';
import Search from '@/features/Provider/components/Search';
import { Link } from 'react-router-dom';
import doulaImage from '@/assets/doula-illustration.svg';
import lactationImage from '@/assets/lactation-illustration.svg';
import mentalHealthImage from '@/assets/mental-health-illustration.svg';
import locationImage from '@/assets/location-splash.png';
import bottomSplash from '@/assets/bottom-splash.png';
import { Card } from '@/features/UI/components/Card/Card';

export const Content = () => {
  return (
    <>
      <section className="bg-yellow">
        <h2>What you'll find here</h2>
        <OptionCenter />
      </section>

      <section className="location-section">
        <img src={locationImage} />
        <span className="location-description">
          <h2>Serving Richmond, VA</h2>
          <p>
            Explain why we’re starting with Richmond, and that we want to expand
            incrementally.
          </p>
        </span>
      </section>

      <section className="bg-yellow">
        <div className="search-container">
          <h2>Let's find you the help you need:</h2>
          <Search type="verbose" updateSearch={() => {}} />
        </div>
      </section>

      <section className="bottom-section">
        <img src={bottomSplash} />
        <Card className="provider-links">
          <h3>Are you a care provider?</h3>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit.{' '}
          </p>
          <Link to="provider-form" className="secondary-button">
            List your practice
          </Link>
          <p>
            Or head to our <Link to="/provider-home">Care Provider Home</Link>{' '}
            for more resources.
          </p>
        </Card>
      </section>
    </>
  );
};
