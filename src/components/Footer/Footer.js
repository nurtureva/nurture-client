import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <h3>Nurture</h3>
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
          <Link>Care Provider Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link>Education Center</Link>
        </li>
        <li>
          <Link>FAQ</Link>
        </li>
        <li>
          <Link>Contact</Link>
        </li>
      </ul>
    </footer>
  );
}
