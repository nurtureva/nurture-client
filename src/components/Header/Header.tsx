import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/images/nurture-logo-1.png';
import { EndpointPropWrapper } from '@/types';
import { useEffect, useState } from 'react';
import { Button, Icon } from '..';
import { isMobile, useMobileViewportChecker } from '@/utils/helpers';

type NavIconType = 'menu' | 'clear';

export const Header = ({ navRoutes }: EndpointPropWrapper) => {
  const location = useLocation();
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const isMobileViewport = useMobileViewportChecker();
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

    if (!isMobileViewport) {
      setIsMobileNavActive(false);
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    if (isMobileNavActive) setNavIcon('clear');
    else setNavIcon('menu');
  }, [isMobileNavActive]);

  return (
    <>
      <header {...{ className }}>
        <span className="logo-container">
          <Link to="/">
            <img src={logo} />
          </Link>
        </span>
        {!isMobileViewport || isMobileNavActive ? (
          <>
            <nav>
              <ul>
                {navRoutes.map((path) => {
                  return (
                    <li key={path.path}>
                      <Link
                        to={path.path}
                        onClick={() => {
                          setIsMobileNavActive(!isMobileNavActive);
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
            {!isMobileViewport ? (
              <Button
                type="secondary"
                size="small"
                to="https://nurturerva.networkforgood.com/projects/150819-nurture-general-fund">
                Donate
              </Button>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}

        <Icon
          type={navIcon}
          onClick={() => {
            setIsMobileNavActive(!isMobileNavActive);
          }}
        />
      </header>
      <div className="header-clone"></div>
      <div className={`banner ${className}`}>
        <span>BETA</span>This is a new directory! It is currently released for
        providers to register. Your feedback will help us improve it.
      </div>
    </>
  );
};
