import { ButtonGroup } from '@/components';
import { Search } from '@/features/Provider/components/Search';
import { Button } from '@/components/Button/Button';
import heroImageSrc from '@/assets/images/dashboard-hero.png';
import doulaImage from '@/assets/images/doula-image.png';
import lactationImage from '@/assets/images/lactation-image.png';
import careProviderImage from '@/assets/images/care-provider-image.png';
import mentalHealthImage from '@/assets/images/mental-health-image.png';
import {
  PictureSplitContainer,
  TypeOfCare
} from '@/components/PictureSplitContainer';
import { InformationSection } from '@/components/InformationSection';
import { Link } from 'react-router-dom';
const isMobile = () => window.innerWidth < 700;

export const Content = () => {
  return (
    <>
      <PictureSplitContainer
        backgroundColor="yellow"
        picture={heroImageSrc}
        type="full">
        <h1>Birth and Early Parenting Resource Directory</h1>
        <p>Welcome to community-centered care for all.</p>
        <ButtonGroup
          buttonProps={[
            { children: 'Find Care', to: '/results' },
            { children: "I'm a care provder", to: '/provider-home' }
          ]}
        />
      </PictureSplitContainer>

      <InformationSection className="search-container">
        <h2>Pregnancy, birth, and early childhood - the right care for you.</h2>
        <p>
          Welcome to the Birth and Early Parenting Resource Directory! We
          understand that the journey to parenthood is a transformative one,
          filled with both joys and challenges. Our directory is designed to
          connect expecting and new parents with resources in our community,
          including doulas for expert birth guidance, lactation consultants for
          nurturing breastfeeding/chestfeeding experiences, and perinatal mental
          health care professionals for emotional well-being. Whether you're
          embarking on the adventure of parenthood for the first time or
          expanding your family, our aim is to ease the process of navigating
          this remarkable life chapter.
        </p>
        {isMobile() ? '' : <Search type="fancy" />}
      </InformationSection>
      {isMobile() ? <Search type="fancy" /> : ''}

      <section className="bg-tan">
        <h2>What you'll find here</h2>
        <p>
          Currently, this directory focuses on three essential categories of
          care: doula services, lactation support, and perinatal mental health
          care. This selection is based on our surveys of expecting and new
          parents' core needs during pregnancy, birth, and early childhood. As
          this project grows, we hope to add more types of care and resources
          for pregnancy, birth, and early parenting.
        </p>
        <p>
          <strong>Disclaimer:</strong> Individuals and organizations listed in
          this directory are for informational purposes only. Nurture does not
          endorse or guarantee the quality of services of any of these
          individuals or organizations. While we do our best to keep information
          updated, there may have been changes since this information was
          posted. Always contact the providers to verify all information before
          making appointments or using services to ensure that you receive
          services and support appropriate for your needs.
        </p>
      </section>
      <section className="bg-tan type-of-care">
        <TypeOfCare picture={doulaImage} title="Doulas" id={1}>
          Trained professionals offering support during pregnancy, childbirth,
          and after childbirth. Doulas provide non-medical support such as
          education, advocacy, and emotional and physical comfort measures to
          help the birthing person and their partner have a positive birth and
          postpartum experience.
        </TypeOfCare>
        <TypeOfCare
          picture={lactationImage}
          title="Lactation Support"
          isRegularPostioning={false}
          id={2}>
          Guidance, education, and assistance to help breastfeeding/chestfeeding
          parents overcome challenges and ensure the health and well-being of
          both parent and baby. This support can include advice, emotional
          support, one-on-one assistance, and more.
        </TypeOfCare>
        <TypeOfCare
          picture={mentalHealthImage}
          title="Mental Health Care"
          id={3}>
          Support for emotional well-being during the perinatal period
          (generally considered pregnancy, birth, and the one to two years after
          childbirth).
        </TypeOfCare>
      </section>
      <InformationSection>
        <h2>Serving Richmond, VA</h2>
        <p>
          This directory currently lists care providers in Greater Richmond,
          Virginia, including the City of Richmond, and the counties of Hanover,
          Henrico, Chesterfield, Goochland, Powhatan, New Kent, and Charles
          City. As the project grows, we hope to expand geographically, with a
          strong foundation built on local communities of parents and care
          providers.
        </p>
      </InformationSection>
      <PictureSplitContainer picture={careProviderImage} backgroundColor="tan">
        <h2>Are you a care provider?</h2>
        <p>
          List your practice in this directory for free! Help new and expecting
          parents find your services while contributing to the creation of a
          comprehensive, accessible resource network.
        </p>
        <Button type="primary" to="/provider-form">
          List your practice
        </Button>
        <p>
          Or head to our <Link to="/provider-home">Care Provider Home</Link> for
          more resources.
        </p>
      </PictureSplitContainer>
      <section className="bg-yellow">
        <h2>Find the help you need.</h2>
        <Search />
        <p>
          The Birth and Early Parenting Resource Directory will help connect you
          with doulas, lactation consultants, and mental health care
          professionals in the Richmond, Virginia area. Search by entering a
          keyword or the type of care you need, or type in a name if you’re
          looking for a specific practitioner. Enter your zip code to search
          providers near you.
        </p>
      </section>
    </>
  );
};
