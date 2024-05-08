import samplePhoto1 from '@/assets/images/profile-1.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import './SampleProviderPage.scss';

export const SampleProviderPage = () => {
  const photoList = [samplePhoto1, samplePhoto2];

  const photoSrc = photoList[Math.floor(Math.random() * photoList.length)];
  return (
    <>
      <div className="sample-provider-header">
        <span className="sample-provider-container"></span>
        <div className="sample-provider-image">
          {/* <Bookmark provider={provider} /> */}
          <img src={photoSrc} />
        </div>
        <section className="sample-information-container">
          <span>
            <h2>Sally</h2>
            <p>Generic Business Name</p>
            <p>
              Type of care:{' '}
              {/* {provider.services?.map((service) => service.name + ', ')} */}
              Doula
            </p>
            {/* <Address provider={provider} /> */}
            <p>3126 West Genric Street Richmond, VA 99999</p>
          </span>
          <span>
            <p>Phone number: 773-999-9999</p>
            <p>Email: sallyw@genric.com</p>
            <p>Website: sallyw.com</p>
          </span>
        </section>
      </div>
      <div className="sample-about-section">
        <h3>About Sally</h3>
        <p>Doula</p>
        <p>A great person</p>
        <h3>Professional Details</h3>
        <p>
          Payment Accepted:{' '}
          {/* {provider.paymentOptions?.map((payment) => payment.name + ', ')} */}
        </p>
        {/* {provider.certifications ? (
          <p>
            Certifications:{' '}
            {provider.certifications?.map(
              (certification) => certification.name + ', '
            )}
          </p>
        ) : (
          ''
        )} */}
        <h3>Personal Details</h3>
        {/* {provider.pronouns} */}
        <p>English</p>
        <h3>Contact Sally</h3>
        <p>773-990-9999</p>
        <p>sallyw@generic.com</p>
        <p>sallyw.com</p>
      </div>
    </>
  );
};
