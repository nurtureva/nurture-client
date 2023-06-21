import Search from '@/features/Provider/components/Search';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <>
      <h2>Let’s find you the help you need.</h2>
      <p>
        The Birth and Early Parenting Resource Directory will help connect you
        with doulas, lactation consultants, and mental health care professionals
        in the Richmond, Virginia area. Use the search boxes below to search by
        the type of care you need, or type in a name if you’re looking for a
        specific practitioner. Enter your zip code to search providers near you.
      </p>
      <Search updateSearch={() => {}} />
      <p>Or:</p>
      <Link className="primary-button" to="/results">
        See all care providers
      </Link>
    </>
  );
};
