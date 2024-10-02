import { PictureSplitContainer } from '@/components/PictureSplitContainer';
import careProviderHeroImage from '@/assets/images/care-provider-hero-image.png';
import howItWorksImage from '@/assets/images/how-it-works.png';
import researchImage from '@/assets/images/research-image.png';
import getListed from '@/assets/images/get-listed.png';
import { Button, ButtonGroup, ButtonPropArray, Input } from '@/components';
import { InformationSection } from '@/components/InformationSection';
import { useEffect, useState } from 'react';
import { accessDatabase } from '../../api/fetch';
import { Modal } from '../../components/Modal';
import Select from 'react-select';
import { ProviderObject } from '@/types';

interface ProviderOption {
  value: number;
  label: string;
  email: string;
}

export const Content = () => {
  // A variable to check if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<ProviderOption | null>(
    null
  );
  // Store the providers retrieved from the backend
  const [providers, setProviders] = useState<ProviderObject[]>([]);
  // Retrieve providers from the backend with a GET request
  async function retrieveProviders(): Promise<void> {
    try {
      const providers = await accessDatabase('GET', 'providers');
      setProviders(providers);
    } catch (error) {
      console.error('Error retrieving providers:', error);
    }
  }
  // Map through the providers and return an object
  let providerOptions: ProviderOption[] = providers.map((provider) => {
    return {
      value: provider.id,
      label: provider.name,
      email: provider.email
    };
  });

  const handleChange = (selectedOption: ProviderOption | null) => {
    setSelectedOption(selectedOption);
  };
  // Call function "retrieveProviders" in a useEffect for the function to run once after the page is rendered
  useEffect(() => {
    retrieveProviders();
  }, []);
  const requestUpdateHandler = () => {
    setIsSubmitted(false);
    setIsModalOpen(true);
  };
  const cancelHandler = () => {
    setIsModalOpen(false);
    setSelectedOption(null);
  };
  const submitHandler = () => {
    // include function that will send email to selected provider
    setIsSubmitted(true);
  };
  const providerButtonProps: ButtonPropArray = [
    { children: 'List your practice', to: '/provider-form' },
    { children: 'Update your listing' }
  ];
  // Custom styling for the Select component
  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow: 'none',
      marginBottom: '20px'
    }),
    menu: (provided) => ({
      ...provided,
      position: 'relative',
      marginTop: '-18px'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#F9E3BD' : 'white',
      color: 'black',
      cursor: 'pointer'
    })
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          title={!isSubmitted ? 'Update/Edit your listing' : 'Thank you!'}
          size="small"
          closeHandler={() => setIsModalOpen(false)}>
          {!isSubmitted ? (
            <>
              <p>
                Begin typing to find your name and click submit. A link to
                update your information will be sent to the email on file.
              </p>
              <Select
                className="basic-single"
                classNamePrefix="custom-select"
                name="options"
                options={providerOptions}
                styles={customStyles}
                menuPosition="relative"
                menuPlacement="bottom"
                onChange={handleChange}
              />
              <section className="button-container">
                <button className="button secondary" onClick={cancelHandler}>
                  Cancel
                </button>
                <button
                  className={`button primary ${
                    !selectedOption ? 'disabled' : ''
                  }`}
                  disabled={!selectedOption}
                  onClick={submitHandler}>
                  Submit
                </button>
              </section>
            </>
          ) : (
            <>
              <p>
                Your request has been submitted. Please check your email for a
                link to update your profile.
              </p>
              <section className="button-container">
                <button className="button secondary" onClick={cancelHandler}>
                  Close
                </button>
              </section>
            </>
          )}
        </Modal>
      )}
      <PictureSplitContainer
        backgroundColor="tan"
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
        <div className="care-provider-btns">
          <Button to="/provider-form">List your practice</Button>
          <Button type="secondary" onClick={requestUpdateHandler}>
            Update your listing
          </Button>
        </div>
      </PictureSplitContainer>
      <InformationSection>
        <h2>About the Birth and Early Parenting Resource Directory</h2>
        <p>
          The Birth and Early Parenting Resource Directory came about in
          response to community surveys and focus groups with parents and
          providers that yielded recurring themes of challenges in accessing
          accurate information and resources, and a fragmented perinatal health
          and early parenting ecosystem. This directory is predicated on the
          idea that pregnancy, birth, and early parenting comprise a critical
          life transition that requires specific resources and supports. Our
          goal is to create a regional hub for Greater Richmond that connects
          parents to resources and provides a pathway for communication and
          collaboration among perinatal and early childhood support providers.
        </p>
        <p>
          In 2021, Nurture conducted a statewide survey of pregnant and
          postpartum parents, who indicated that their top needs were for mental
          health, lactation, and doula support across nearly every demographic
          category. We are piloting the directory with these parent-informed
          categories, with the goal of adding more resource categories as
          funding allows. As we go, we are also collecting demographic data on
          providers to capture a snapshot of how our providers reflect the
          communities they serve, and to measure change over time in provider
          demographics. This de-identified data will be shared publicly to help
          inform collective efforts to build a truly diverse and responsive
          pregnancy/early childhood support ecosystem.
        </p>
        <p>
          We hope you will join us by listing your services here, as we work to
          build a culture of support for Richmond's newest families. In order to
          ensure equitable access to all, there is no fee to be listed in the
          directory. If you would like to contribute to expanding this
          initiative, please consider a donation in any amount to Nurture to
          support our ecosystem building work.
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
      {/* <section className="bg-yellow share-directory">
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
      </section> */}
    </>
  );
};
