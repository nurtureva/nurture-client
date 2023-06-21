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

  console.log(location);
  return (
    <header>
      <span className="logo-container">
        <img src={logo} />
      </span>

      <nav>
        <ul>
          {navRoutes.map((path) => {
            console.log(
              'menu path:',
              path.path,
              'location path:',
              location.pathname.split('/')[1],
              'equal?'
            );
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
