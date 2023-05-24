import { Link } from 'react-router-dom';
import logo from '../../assets/nurture-logo-1.png';
import { EndpointPropWrapper } from '../../types';

export default function Header({ navRoutes }: EndpointPropWrapper) {
  return (
    <header>
      <span className="logo-container">
        <img src={logo} />
      </span>

      <nav>
        <ul>
          {navRoutes.map((path) => {
            return (
              <li key={path.path}>
                <Link to={path.path}>{path.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
