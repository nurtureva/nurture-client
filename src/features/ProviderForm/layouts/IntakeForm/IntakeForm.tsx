import { ButtonGroup, ButtonPropArray } from '@/components';
import { useState } from 'react';
import { FormManager } from '../..';
import { FormType } from '../../types';
import './intakeForm.scss';
import { Link, useLoaderData } from 'react-router-dom';

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
  return (
    <section className="form-selector">
      <section className="header-section">
        <h1>Get listed in the directory</h1>
        <h3>Read the following before you start!</h3>
        <a>Skip the intructions-take me to the registration form</a>
      </section>
      <section className="container">
        <section className="info-section large">
          <aside>
            <h2>
              <span>Q.</span>Who's eligible?
            </h2>
          </aside>
          <section>
            <p>We work with providers in the Greater Ricmond, VA area.</p>
            <p>
              You may register if you work in Virginia's Planning District 15,
              which includes the City of Richmond and the counties of Henrico,
              Chesterfield, Hanover, Goochland, Powhatan, New Kent, and Charles
              City.
            </p>
          </section>
        </section>
        <section className="info-section medium">
          <aside>
            <h2>
              <span>Q.</span>What should I prepare?
            </h2>
            <p>
              We’ll ask for some things that you may want to prepare ahead of
              time. All of these are optional but strongly recommended!
            </p>
          </aside>
          <section>
            <ul>
              <li>An overview of your services, up to 1000 characters.</li>
              <li>A personal bio, up to 1000 characters.</li>
              <li>
                A photo of yourself with your face centered. A square photo will
                work best.
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
            <button>View Sample Profile</button>
          </section>
        </section>
      </section>
      <div className="bg-tan">
        <h2>Start your registration</h2>
        <p>
          Are you an individual practitioner or an organization such as a
          hospital, agency, or group practice? (Note: if you are an individual
          practitioner who is affiliated with or employed by a group, please
          select the Individual Practitioner button below.)
        </p>
        <ButtonGroup buttonProps={{ ...buttonProps }} />
      </div>
      <p>
        This form is for practicing providers wanting to include their
        information in the directory project. If you want to view the current
        providers, <Link to="/results">click here</Link>.
      </p>
    </section>
  );
};
