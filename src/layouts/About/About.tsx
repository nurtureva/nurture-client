import { PictureSplitContainer } from '@/components';
import heroImage from '@/assets/images/about-hero.png';

export const Content = () => {
  return (
    <>
      <PictureSplitContainer backgroundColor="yellow" picture={heroImage}>
        <h1>About the Birth and Early Parenting Resource Directory</h1>
        <p>
          The Birth and Early Parenting Resource Directory is an initiative of{' '}
          <a
            href="https://www.nurturerva.org"
            target="_blank"
            rel="noopener noreferrer">
            Nurture
          </a>
          . Currently, it focuses on three essential categories of care: doula,
          lactation, and perinatal mental health supports. This selection is
          based on our surveys of parents’ core needs during pregnancy, birth,
          and early childhood. As this project grows, we hope to add more
          categories of care.
        </p>
      </PictureSplitContainer>
      <section>
        <h2>About Nurture</h2>
        <p>
          Nurture is a Richmond, Virginia based nonprofit committed to improving
          the health and wellbeing of childbearing families by catalyzing
          systems level change in three key areas:
        </p>
        <h3>Birth & Early Parenting Resource Directory</h3>
        <p>
          Nurture is piloting an online repository of verified pregnancy and
          early parenting resources that will reduce organizational siloing,
          create a better networked maternal/infant health ecosystem, be a
          platform to reach the community, and help identify gaps in service.
          Learn more about the history of this project{' '}
          <a
            href="https://www.canva.com/design/DAF5hCHDs8w/OiJejTXr6Lj6M88vRgAwuw/view?utm_content=DAF5hCHDs8w&utm_campaign=designshare&utm_medium=link&utm_source=viewer"
            target="_blank"
            rel="noopener noreferrer">
            here
          </a>
          .
        </p>
        <h3>#RVAbreastfeeds</h3>
        <p>
          Since 2013, this collaborative effort has engaged multiple
          stakeholders to reduce childhood obesity through policy,
          infrastructure, and environmental changes that promote a
          breastfeeding-friendly community in Richmond. Nurture is an official
          member of the United States Breastfeeding Committee
        </p>
        <h3>Ecosystem Cultivation</h3>
        <p>
          Nurture hosts a combination of educational seminars, facilitated
          conversations, and community events where Perinatal Health and Early
          Childhood Stakeholders gather for peer learning and the cross-sector
          relationship building that are necessary for a healthy, connected,
          resilient perinatal health ecosystem.
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
