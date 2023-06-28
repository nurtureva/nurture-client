import {
  Link,
  useLocation,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import logo from '@/assets/nurture-logo-1.png';
import './header.scss';
import { EndpointPropWrapper } from '@/types';

export default function Header({ navRoutes }: EndpointPropWrapper) {
  const location = useLocation();

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
                <Link
                  to={path.path}
                  className={
                    location.pathname.split('/')[1] == path.path ? 'active' : ''
                  }>
                  {path.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
