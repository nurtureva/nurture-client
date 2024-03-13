import VDHLogo from '@/assets/images/VDH_logo.png';
import robinsFoundationLogo from '@/assets/images/robins-foundation-logo.png';
import cityOfRichmondLogo from '@/assets/images/city-of-richmond-logo.png';

export const SponsorsSection = () => {
  return (
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
      <a href="https://www.rva.gov/" target="_blank" rel="noopener noreferrer">
        <img src={cityOfRichmondLogo} />
      </a>
    </section>
  );
};
