import { Link } from 'react-router-dom';
import { EndpointPropWrapper } from '@/types';

export default function Footer({ navRoutes }: EndpointPropWrapper) {
  return (
    <footer>
      <h3>Nurture</h3>
      <ul>
        {navRoutes.map((path) => {
          return (
            <li key={path.path}>
              <Link to={path.path}>{path.name}</Link>
            </li>
          );
        })}
      </ul>
      <ul>
        <li>
          <a>Education Center</a>
        </li>
        <li>
          <a>FAQ</a>
        </li>
        <li>
          <a>Contact</a>
        </li>
      </ul>
    </footer>
  );
}
