import { Link } from 'react-router-dom';

export default function Footer({ navPaths }) {
  return (
    <footer>
      <h3>Nurture</h3>
      <ul>
        {navPaths.map((path) => {
          return (
            <li key={path.path}>
              <Link to={path.path}>{path.name}</Link>
            </li>
          );
        })}
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
