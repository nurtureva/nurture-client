import { Link } from 'react-router-dom';
import '../Dashboard/Dashboard.scss';

export default function DefaultCare() {
  return (
    <div className="find-care">
      <h1>Birth and Early Parenting Resource Directory</h1>
      <div className="content-header">
        <h3>Let’s find you the help you need.</h3>
        <p>
          The Birth and Early Parenting Resource Directory will help connect you
          with doulas, lactation consultants, and mental health care
          professionals in the Richmond, Virginia area. Use the search boxes
          below to search by the type of care you need, or type in a name if
          you’re looking for a specific practitioner. Enter your zip code to
          search providers near you.
        </p>
        <p>
          <input /> near <input />
        </p>
        <p>Or:</p>
        <Link className="link-button" to="/results">
          See all care providers
        </Link>
      </div>
    </div>
  );
}
