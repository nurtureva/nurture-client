import devonLanePhoto from '@/assets/images/DevonLane.png';
import sampleLogo from '@/assets/images/SampleLogo.png';
import './SampleProviderPage.scss';

export const SampleProviderPage = () => {
  return (
    <>
      <div className="sample-provider-header">
        <span className="sample-provider-container"></span>
        <div className="sample-provider-image">
          <img className="logo-label" src={sampleLogo} />
          <img src={devonLanePhoto} />
        </div>
        <section className="sample-information-container">
          <span>
            <h2>Devon Lane</h2>
            <p>Bluebird Lactation and Wellness</p>
            <p>
              Type of care:{' '}
              {/* {provider.services?.map((service) => service.name + ', ')} */}
              Lactation Support
            </p>
            {/* <Address provider={provider} /> */}
            <p>2972 Westheimer Rd. Richmond, VA 23221</p>
          </span>
          <span>
            <p>Phone number: 804-555-0199</p>
            <p>Email: Devon@bluebirdlactation.com</p>
            <p>Website: BluebirdLactation.com</p>
          </span>
        </section>
      </div>
      <div className="sample-about-section">
        <p>Overview of services:</p>

        <p>
          I provide comprehensive support for breastfeeding mothers, including:
        </p>
        <ul className="sample-list">
          <li>
            {' '}
            Personalized one-on-one consultations to address latch difficulties,
            milk supply concerns, and other challenges.
          </li>
          <li>
            Prenatal education sessions covering breastfeeding basics,
            positioning, and establishing a strong foundation.
          </li>
          <li>
            Postnatal guidance during the early days, with help on feeding
            techniques, troubleshooting, and emotional support.
          </li>
          <li>
            Customized feeding plans tailored to your baby's needs and your
            lifestyle.
          </li>
          <li>
            {' '}
            Workshops and support groups for connecting with other breastfeeding
            mothers and gaining insights.
          </li>
        </ul>
        <h3>About Devon</h3>
        <p>
          Hey there, I'm Devon, your lactation support provider based right here
          in Richmond, VA. As a devoted mom of two, I intimately understand the
          highs and lows of breastfeeding. Armed with my Certified Lactation
          Consultant (CLC) certification and years of hands-on experience, I'm
          passionate about guiding mothers through this incredible journey with
          confidence and ease. From troubleshooting latch issues to providing
          personalized feeding plans, I'm dedicated to supporting you every step
          of the way. Outside of my work, I'm an avid advocate for breastfeeding
          education in our community, hosting workshops and support groups. When
          I'm not empowering moms, you can find me exploring Richmond's culinary
          delights or hiking along the James River with my family. Let's join
          forces and make your breastfeeding experience as rewarding as it
          should be!
        </p>
        <p>Payment Accepted: </p>
        <p>Fee for service, Sliding scale</p>
        <p>Certfications:</p>
        <p>Certified Lactation Counselor (CLC)</p>
        <h3>Personal Details</h3>
        {/* {provider.pronouns} */}
        <p>Languages Spoken: English, Spanish</p>
        <p>Pronouns: she/her/hers</p>
        <p>Race/ethnicity: Black</p>
        <p>Gender: Woman, Cisgender</p>
        <h3>Contact Devon</h3>
        <p>Phone Number: 804-555-0199</p>
        <p>Email: Devon@bluebirdlactation.com</p>
        <p>Website: BluebirdLactation.com</p>
      </div>
    </>
  );
};
