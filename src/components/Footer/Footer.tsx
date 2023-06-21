import { Link } from 'react-router-dom';
import { EndpointPropWrapper } from '@/types';
import logo from '@/assets/nurture-logo-1.png';
import './footer.scss';

export default function Footer({ navRoutes }: EndpointPropWrapper) {
  return (
    <footer>
      <img src={logo} />
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
