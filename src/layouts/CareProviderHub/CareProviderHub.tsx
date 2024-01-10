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
          List your practice in this directory for free! Help new and expecting
          parents find and hire you while contributing to the creation of
          comprehensive, accessible resource network.
        </p>
        <Button to="/provider-form">List your practice</Button>
        {/* <ButtonGroup buttonProps={providerButtonProps} /> */}
      </PictureSplitContainer>
      <InformationSection>
        <h2>About the Birth and Early Parenting Resource Directory</h2>
        <p>
          {' '}
          The Birth and Early Parenting Resource Directory came about in
          response to multiple community surveys and focus groups with parents
          and providers. These yielded recurring themes of 1) challenges in
          accessing accurate information and resources and 2) a fragmented
          perinatal health and early parenting ecosystem. Our goal is to create
          a regional hub for Greater Richmond that connects parents to resources
          and provides a pathway for communication and collaboration among
          perinatal and early childhood support providers.
        </p>
        <p>
          {' '}
          In 2021, Nurture and Postpartum Support Virginia conducted a statewide
          survey of pregnant and postpartum parents, who indicated that their
          top needs were for mental health, lactation, and doula support. We are
          piloting the directory with these parent-informed categories, with the
          goal of adding more resource categories as funding allows. As we go,
          we are also collecting demographic data on providers to capture
          snapshots of how our providers reflect the communities they serve.
          This de-identified data will be shared publicly to help inform
          collective efforts to build a truly diverse and responsive
          pregnancy/early childhood support ecosystem.
        </p>
        <p>
          {' '}
          We hope you will join us by listing your services here, as we work to
          build a culture of support for Richmond’s newest families. In order to
          ensure equitable access to all, there is no fee to be listed in the
          directory. If you would like to contribute to expanding this
          initiative, please consider a donation to support Nurture's systems
          building work.
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
        <h3>Our asset mapping project</h3>
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
          Read our full research report
        </Button>
      </PictureSplitContainer>
      <PictureSplitContainer backgroundColor="tan" picture={getListed}>
        <h3>Get listed!</h3>
        <p>
          Help new and expecting parents find your tice by adding a listing to
          the Birth and Early Parenting Resource Directory! Or update your
          existing listing to keep your information current.
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
