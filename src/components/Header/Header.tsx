import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/images/nurture-logo-1.png';
import { EndpointPropWrapper } from '@/types';
import { useEffect, useState } from 'react';
import { Button, Icon } from '..';

type NavIconType = 'menu' | 'clear';

export const Header = ({ navRoutes }: EndpointPropWrapper) => {
  const location = useLocation();
  const [mobileNav, setMobileNav] = useState(
    window.innerWidth < 700 ? false : true
  );
  const [navIcon, setNavIcon] = useState<NavIconType>('menu');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 80) {
        setClassName('condensed');
      } else {
        setClassName('');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileNav) setNavIcon('clear');
    else setNavIcon('menu');
  }, [mobileNav]);

  return (
    <>
      <header {...{ className }}>
        <span className="logo-container">
          <Link to="/">
            <img src={logo} />
          </Link>
        </span>
        {mobileNav ? (
          <>
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
            <Button
              type="secondary"
              size="small"
              to="https://nurturerva.networkforgood.com/projects/150819-nurture-general-fund">
              Donate
            </Button>
          </>
        ) : (
          ''
        )}

        <Icon
          type={navIcon}
          onClick={() => {
            setMobileNav(!mobileNav);
          }}
        />
      </header>
      <div className="header-clone"></div>
    </>
  );
};
