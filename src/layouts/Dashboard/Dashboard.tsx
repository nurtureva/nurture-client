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
        <p className="header-label">
          The Birth and Early Parenting Resource Directory
        </p>
        <h2>Pregnancy, birth, and early childhood - the right care for you.</h2>
        <p>
          Welcome to the Birth and Early Parenting Resource Directory! We
          understand that the journey to parenthood is a transformative one,
          filled with both joys and challenges. Our directory is designed to
          connect parents and expecting parents with a network of trusted
          professionals, including doulas for expert birth guidance, lactation
          consultants for nurturing breastfeeding/chestfeeding experiences, and
          perinatal mental health care professionals for emotional well-being.
          Whether you're embarking on the adventure of parenthood for the first
          time or expanding your family, our aim is to provide you with the
          resources and connections you need to navigate this remarkable chapter
          with confidence and care.
        </p>
        <Search type="fancy" />
      </InformationSection>

      <section className="bg-tan">
        <h2>What you'll find here</h2>
        <p>
          Currently, this directory focuses on three essential categories of
          care: doula services, lactation support, and perinatal mental health
          care. This selection is based on our research on parents’ and
          expecting parents’ core needs during pregnancy, birth, and early
          childhood. As this project grows, we hope to expand to add even more
          types of care. Our goal is for every aspect of your journey into
          parenthood to be met with the guidance and expertise you deserve. Read
          on to learn about our current offerings.
        </p>
      </section>
      <TypeOfCare picture={doulaImage} title="Doulas" id={1}>
        Trained professionals offering support to expectant parents throughout
        pregnancy, childbirth, and after childbirth. They provide non-medical
        support such as education, advocacy, and emotional and physical comfort
        measures to help the birthing person and their partner have a positive
        birth experience.
      </TypeOfCare>
      <TypeOfCare
        picture={lactationImage}
        title="Lactation Support"
        isRegularPostioning={false}
        id={2}>
        Guidance, education, and assistance to help breastfeeding/chestfeeding
        parents overcome challenges and ensure the health and well-being of both
        the parent and baby. This support can include advice, emotional support,
        one-on-one assistance, and more.
      </TypeOfCare>
      <TypeOfCare picture={mentalHealthImage} title="Mental Health Care" id={3}>
        Support for emotional well-being during the perinatal period (pregnancy
        and the first year after childbirth). These care providers address
        mental health concerns that may arise during this time such as
        depression and anxiety, and can support the transition to parenthood and
        the development of healthy parent-child relationships.
      </TypeOfCare>

      <InformationSection>
        <p className="header-label">
          The Birth and Early Parenting Resource Directory
        </p>
        <h2>Serving Richmond, VA</h2>
        <p>
          This directory currently lists care providers in the Richmond, VA,
          area. We're starting with this focus to ensure high-quality local
          care. As the project grows and develops, we hope to expand
          geographically, with a strong foundation built on communities of
          parents and care providers.
        </p>
      </InformationSection>
      <PictureSplitContainer picture={careProviderImage} backgroundColor="tan">
        <h2>Are you a care provider?</h2>
        <p>
          List your practice in this directory for free! Help new and expecting
          parents find and hire you while contributing to the creation of a
          comprehensive, accessible resource network.
        </p>
        <Button type="primary">List your practice</Button>
        <p>Or head to our Care Provider Home for more resources.</p>
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
