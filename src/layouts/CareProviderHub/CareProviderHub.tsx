import { PictureSplitContainer } from '@/components/PictureSplitContainer';
import careProviderHeroImage from '@/assets/images/care-provider-hero-image.png';
import howItWorksImage from '@/assets/images/how-it-works.png';
import researchImage from '@/assets/images/research-image.png';
import getListed from '@/assets/images/get-listed.png';
import { Button, ButtonGroup, ButtonPropArray, Input } from '@/components';
import { InformationSection } from '@/components/InformationSection';

export const Content = () => {
  const providerButtonProps: ButtonPropArray = [
    { children: 'List your practice', to: '/provider-form' },
    { children: 'Update your listing' }
  ];
  return (
    <>
      <PictureSplitContainer
        backgroundColor="yellow"
        picture={careProviderHeroImage}>
        <h1>
          Care Providers: Join the Birth and Early Parenting Resource Directory!
        </h1>
        <p>
          List your practice in this directory for free! If you are a care
          provider in the Greater Richmond, VA area, you can help new and
          expecting parents find and hire you while contributing to the creation
          of comprehensive, accessible resource network.
        </p>
        <Button to="/provider-form">List your practice</Button>
        {/* <ButtonGroup buttonProps={providerButtonProps} /> */}
      </PictureSplitContainer>
      <InformationSection>
        <h2>About the Birth and Early Parenting Resource Directory</h2>
        <p>
          The Birth and Early Parenting Resource Directory came about in
          response to multiple community surveys of parents and providers. These
          yielded recurring themes of
          <ol>
            <li>
              challenges in accessing accurate information and resources, and
            </li>{' '}
            <li>
              a fragmented perinatal health and early parenting ecosystem.
            </li>
          </ol>
          <strong>
            Our goal is to create a regional hub for Greater Richmond that
            connects parents to resources and provides a pathway for
            communication and collaboration among perinatal and early childhood
            support providers.
          </strong>
        </p>
        <p>
          In 2021,{' '}
          <a
            href="https://nurturerva.org/"
            target="_blank"
            rel="noopener noreferrer">
            Nurture
          </a>{' '}
          and{' '}
          <a
            href="https://postpartumva.org/"
            target="_blank"
            rel="noopener noreferrer">
            Postpartum Support Virginia
          </a>{' '}
          conducted a{' '}
          <a
            href="https://www.canva.com/design/DAEiCTRvO7Q/CUXZOJf9792LLcvd3Muk5Q/edit?utm_content=DAEiCTRvO7Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
            target="_blank"
            rel="noopener noreferrer">
            statewide survey
          </a>{' '}
          of pregnant and postpartum parents, who indicated that their top needs
          were for mental health, lactation, and doula support. We are piloting
          the directory with these parent-informed categories, with the goal of
          adding more resource categories as funding allows. As we go, we are
          also collecting demographic data on providers to capture snapshots of
          how our providers reflect the communities they serve. This
          de-identified data will be shared with community partners to help
          inform collective efforts to build a truly diverse and responsive
          pregnancy/early childhood support ecosystem.
        </p>
        <p>
          We hope you will join us by listing your services here, as we work to
          build a culture of support for Richmond’s newest families. In order to
          ensure equitable access to all, there is no fee to be listed in the
          directory.
        </p>
        <p>
          <strong>Help expand the directory!</strong>{' '}
          <a
            href="https://nurturerva.networkforgood.com/projects/150819-nurture-general-fund"
            target="_blank"
            rel="noopener noreferrer">
            Please consider a donation to support Nurture's systems building
            work.
          </a>
        </p>
      </InformationSection>
      <PictureSplitContainer backgroundColor="tan" picture={howItWorksImage}>
        <h3>How it works</h3>
        <p>
          Individual practitioners as well as representatives of organizations
          can fill out a registration form, which will be sent to Nurture for
          approval, and added to the directory. The information you enter when
          registering will be turned into a searchable, public-facing profile,
          to connect you or your organization to parents seeking care. Some
          demographic information we collect will be used only to further our
          research, and will not be displayed on your public profile.{' '}
        </p>
        <Button type="secondary" to="/provider-form">
          Register in the directory
        </Button>
      </PictureSplitContainer>
      <PictureSplitContainer
        backgroundColor="tan"
        reverse
        pictureType="icon"
        picture={researchImage}>
        <h3>The Perinatal Resource Mapping Project</h3>
        <p>
          Over the past several years, Nurture has been conducting research into
          the needs of parents and the resources currently available to them.
          Our 2021 Perinatal Resource Mapping Project looked at the
          distribution, demographics, and accessibility of Perinatal Mental
          Health, Lactation, and Doula support providers in Planning District
          15, which includes the City of Richmond and the counties of Henrico,
          Chesterfield, Hanover, Goochland, Powhatan, New Kent, and Charles
          City. Listing your practice or organization in this directory helps us
          continue to measure and map the resources available to pregnant and
          postpartum families in Greater Richmond.
        </p>
        <Button
          to="https://www.canva.com/design/DAE512OqBZ4/XR-kvBgRHHrQZSs0vrRcOg/view?utm_content=DAE512OqBZ4&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink"
          type="secondary">
          Read our full report
        </Button>
      </PictureSplitContainer>
      <PictureSplitContainer backgroundColor="tan" picture={getListed}>
        <h3>Get listed!</h3>
        <p>
          Help new and expecting parents find your practice by adding a listing
          to the Birth and Early Parenting Resource Directory! Or update your
          existing listing to keep your information current. We are currently
          working with providers in the Greater Richmond, VA area; please
          register only if you work in Virginia's Planning District 15, which
          includes the City of Richmond and the counties of Henrico,
          Chesterfield, Hanover, Goochland, Powhatan, New Kent, and Charles
          City.
        </p>
        <ButtonGroup buttonProps={providerButtonProps} />
      </PictureSplitContainer>
      <section className="bg-yellow share-directory">
        <h2>Share the directory</h2>
        <p>
          Do you know another care practitioner who should join the Birth and
          Early Parenting Resources Directory? Invite them to create a profile!
          Fill out their name and email below, and we’ll send them an invitation
          to list their practice in the directory.
        </p>
        <span>
          <Input label="Practitioner's name" />
          <Input label="Practitioner's email address" />
          <Button>Send invite</Button>
        </span>
      </section>
    </>
  );
};
