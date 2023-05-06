import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <span className="logo-container">
        <img src="https://nurture-provider-photos.s3.amazonaws.com/nurture-logo-1.png" />
      </span>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/find-care">Find Care</Link>
          </li>
          <li>
            <Link to="/results">Directory</Link>
          </li>
          <li>
            <Link to="/">Care Provider Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
