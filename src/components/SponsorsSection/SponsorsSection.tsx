import VDHLogo from '@/assets/images/VDH_logo.png';
import robinsFoundationLogo from '@/assets/images/robins-foundation-logo.png';
import cityOfRichmondLogo from '@/assets/images/city-of-richmond-logo.png';
import bonSecoursLogo from '@/assets/images/bon-secours.png';
import molinaLogo from '@/assets/images/molina.png';
import { useLocation } from 'react-router-dom';

export const SponsorsSection = () => {
  const location = useLocation();

  let paths = ['/', '/about', '/learn-more', '/provider-home'];
  return (
    <>
      {paths.includes(location.pathname) ? (
        <div>
          <section className="sponsors-section">
            <h3>Supported by:</h3>
            <a
              href="https://robinsfdn.org/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={robinsFoundationLogo} />
            </a>
            <a
              href="https://www.vdh.virginia.gov/pregnancy/resources/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={VDHLogo} />
            </a>
            <a
              href="https://www.rva.gov/"
              target="_blank"
              rel="noopener noreferrer">
              <img src={cityOfRichmondLogo} />
            </a>
          </section>
          <section className="community-sponsors-section">
            <h3>Community Partners</h3>
            <section>
              <a
                href="https://www.bonsecours.com/locations/hospitals-medical-centers/richmond"
                target="_blank"
                rel="noopener noreferrer">
                <img src={bonSecoursLogo} />
              </a>
              <a
                href="https://www.molinahealthcare.com/"
                target="_blank"
                rel="noopener noreferrer">
                <img src={molinaLogo} />
              </a>
            </section>
          </section>
        </div>
      ) : null}
    </>
  );
};
