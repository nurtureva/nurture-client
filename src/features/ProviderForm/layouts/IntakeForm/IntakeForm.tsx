import { ButtonGroup, ButtonPropArray } from '@/components';
import { useState } from 'react';
import { FormManager } from '../..';
import { FormType } from '../../types';
import './intakeForm.scss';
import { Link, useLoaderData } from 'react-router-dom';
import { Modal } from '../../../../components/Modal';
import { SampleProviderPage } from '../SampleProviderPage';

export const IntakeForm = () => {
  const [formType, setFormType] = useState<FormType>();
  return (
    <div className="form">
      {/* <h1>Add your practice to the Directory</h1> */}
      {formType ? (
        <FormManager formType={formType} />
      ) : (
        <Initializer setFormType={setFormType} />
      )}
    </div>
  );
};

const Initializer = ({
  setFormType
}: {
  setFormType: React.Dispatch<React.SetStateAction<FormType | undefined>>;
}) => {
  const buttonProps: ButtonPropArray = [
    {
      children: 'Individual Practitioner',
      onClick: () => {
        setFormType('individual');
      }
    },
    {
      children: 'Organization',
      onClick: () => {
        setFormType('organization');
      }
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const scrollToForm = () => {
    const formElement = document.getElementById('registration');

    if (formElement) {
      const formPosition = formElement.getBoundingClientRect().top;

      window.scrollTo({
        top: formPosition - 15,
        behavior: 'smooth'
      });
    }
  };
  return (
    <>
      <section className="form-selector">
        <section className="header-section">
          <h1>Get listed in the directory</h1>
          <h3>Read the following before you start!</h3>
          <a onClick={scrollToForm}>
            Skip the intructions-take me to the registration form
          </a>
        </section>
        <section className="container">
          <section className="info-section extra-large">
            <aside>
              <h2>
                <span>Q.</span>Who's eligible?
              </h2>
            </aside>
            <section>
              <p>We work with providers in the Greater Richmond, VA area.</p>
              <p>
                You may register if you work in Virginia's Planning District 15,
                which includes the City of Richmond and the counties of Henrico,
                Chesterfield, Hanover, Goochland, Powhatan, New Kent, and
                Charles City.
              </p>
            </section>
          </section>
          <section className="info-section medium">
            <aside>
              <h2>
                <span>Q.</span>What should I prepare?
              </h2>
            </aside>
            <section>
              <p>
                We’ll ask for some things that you may want to prepare ahead of
                time. All of these are optional but strongly recommended!
              </p>
              <ul>
                <li>An overview of your services, up to 1000 characters.</li>
                <li>A personal bio, up to 1000 characters.</li>
                <li>
                  A photo of yourself with your face centered. A square photo
                  will work best.
                </li>
                <li>Your practice’s logo.</li>
              </ul>
            </section>
          </section>
          <section className="info-section small">
            <aside>
              <h2>
                <span>Q.</span>How will my info be displayed?
              </h2>
            </aside>
            <section>
              <p>
                Preview our sample profile page to see how the information you
                enter will be displayed publicly.
              </p>
              <button onClick={() => setIsModalOpen(true)}>
                View Sample Profile
              </button>
            </section>
          </section>
          <section className="info-section large">
            <aside>
              <h2>
                <span>Q.</span>Does my work save as I go?
              </h2>
            </aside>
            <section>
              <p>
                Your progress is saved as long as you don’t clear your browser
                cookies, and you keep the registration form open.
              </p>
            </section>
          </section>
        </section>

        <div id="registration" className="bg-tan">
          <h2>Ready to register?</h2>
          <section className="registration-container">
            <section className="registration-section">
              <h2>Individual Practitioners</h2>
              <p>
                Are you an individual care provider, either with your own solo
                practice or who works for an organization like a hospital or
                agency?
              </p>
              <button
                className="button primary"
                onClick={buttonProps[0].onClick}>
                Indivdual Registration
              </button>
            </section>
            <section className="registration-section">
              <h2>Organizations and Groups</h2>
              <p>
                Are you an administrator, owner, or other authorized
                representative of an organization like a hospital or agency?
              </p>
              <button
                className="button secondary"
                onClick={buttonProps[1].onClick}>
                Organization Registration
              </button>
            </section>
          </section>
        </div>
      </section>
      {isModalOpen && (
        <Modal
          title="Sample Profile"
          size="large"
          closeHandler={() => setIsModalOpen(false)}>
          <SampleProviderPage />
        </Modal>
      )}
    </>
  );
};
