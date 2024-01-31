import { PictureSplitContainer } from '@/components';
import heroImage from '@/assets/images/about-hero.png';

export const Content = () => {
  return (
    <>
      <PictureSplitContainer backgroundColor="yellow" picture={heroImage}>
        <h1>About the Birth and Early Parenting Resource Directory</h1>
        <p>
          The Birth and Early Parenting Resource Directory is a listing of
          doulas, lactation support providers, and perinatal mental health care
          providers.{' '}
        </p>
      </PictureSplitContainer>
      <section>
        <h2>About Us</h2>
        <p>
          About the Birth and Early Parenting Resource Directory Nurture is a
          Richmond, Virginia based nonprofit committed to improving the health
          and wellbeing of childbearing families through fitness, education,
          social support, and community engagement. We focus our programs on
          increasing equity in and access to perinatal support through a
          combination of systems change and community education. For more
          information about Nurture visit: https://nurturerva.org/
        </p>
      </section>
      <section>
        <div className="values-section">
          <p>
            In creating this directory, we hold ourselves accountable to the
            following values:
          </p>
          <h2>Purpose</h2>
          <p>
            We believe that easy, equitable, and transparent access to available
            education, resources, and opportunities is an essential component of
            a healthy birth and early parenting ecosystem.
          </p>
          <h2>Our Values</h2>
          <ul>
            <li>
              Every birthing parent deserves a safe, respectful birth and early
              parenting experience.
            </li>
            <li>
              Every child deserves to be born and raised in a safe, respectful,
              and nurturing environment.
            </li>{' '}
            <li>
              All families have access to culturally appropriate care and
              support.
            </li>
            <li>
              Collaboration and communication among providers who serve
              expecting and new parents is valued and supported.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
