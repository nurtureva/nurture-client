import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/images/nurture-logo-1.png';
import { EndpointPropWrapper } from '@/types';
import { useEffect, useRef, useState } from 'react';

export const Header = ({ navRoutes }: EndpointPropWrapper) => {
  const location = useLocation();

  const [mobileNav, setMobileNav] = useState(
    window.innerWidth < 700 ? false : true
  );
  const [navIcon, setNavIcon] = useState('menu');

  useEffect(() => {
    if (mobileNav) setNavIcon('clear');
    else setNavIcon('menu');
  }, [mobileNav]);

  return (
    <header>
      <span className="logo-container">
        <img src={logo} />
      </span>
      {mobileNav ? (
        <nav>
          <ul>
            {navRoutes.map((path) => {
              return (
                <li key={path.path}>
                  <Link
                    to={path.path}
                    onClick={() => {
                      if (window.innerWidth < 700) setMobileNav(!mobileNav);
                    }}
                    className={
                      location.pathname.split('/')[1] == path.path
                        ? 'active'
                        : ''
                    }>
                    {path.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        ''
      )}

      <i
        className={`icon-${navIcon}`}
        onClick={() => {
          setMobileNav(!mobileNav);
        }}
      />
    </header>
  );
};
