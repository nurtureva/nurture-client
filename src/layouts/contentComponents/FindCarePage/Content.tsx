import { Button } from '@/components/Button/Button';
import OptionCenter from '@/components/OptionCenter/OptionCenter';

export const Content = () => {
  return (
    <>
      <section className="bg-yellow">
        <h2>Our main categories of care:</h2>
        <OptionCenter />
        <span>
          <h3>Not ready to narrow down your search?</h3>
          <Button type="secondary" to="/results">
            See all care providers
          </Button>
        </span>
      </section>
    </>
  );
};
