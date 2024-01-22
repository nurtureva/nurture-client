import { Button, ButtonGroup, ButtonPropArray } from '@/components';
import { useState } from 'react';
import { FormManager } from '../..';
import { FormType, InputObject } from '../../types';
import './intakeForm.scss';
import { Link, useLoaderData } from 'react-router-dom';

export type Initializer = () => InputObject[] | undefined;
export const IntakeForm = () => {
  const [formType, setFormType] = useState<FormType>();
  return (
    <div className="form">
      <h1>Add your practice to the Directory</h1>
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
      <p>
        Enter your information to be added to the Birth and Early Parenting
        Resource Directory. The information you enter will be used to create a
        searchable profile in the directory. You may enter information as an
        Individual Practitioner to create a profile page for your own practice.
        Administrators of organizations like hospitals, agencies, and other
        working groups can also create a profile for their organization. We are
        currently working with providers in the Greater Richmond, VA area;
        please register only if you work in Virginia's Planning District 15,
        which includes the City of Richmond and the counties of Henrico,
        Chesterfield, Hanover, Goochland, Powhatan, New Kent, and Charles City.
      </p>
      <p>
        We also collect this data for our research to better understand the
        local perinatal health ecosystem. For more information, please see our
        <a href="">Privacy Policy</a> and read more about our{' '}
        <a href="">asset mapping activities. </a>
      </p>
      <p>
        Once submitted, a Nurture staff member will review the listing to make
        sure it is complete and reach out to you with any questions. Listings
        usually go live on the directory within two weeks of submission.
      </p>
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
