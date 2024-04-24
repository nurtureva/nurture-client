import { useLoaderData, useNavigate } from 'react-router-dom';
import { OrganizationObject, ProviderObject } from '@/types';
import samplePhoto1 from '@/assets/images/profile-1.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import { Bookmark } from '../components/Bookmark';
import { Button, Icon } from '@/components';
import { Address } from '../components/Address';
import { confirmChoice } from '@/features/Admin/utils/helpers';
import { addHash } from '@/features/ProviderForm/utils/api';

export default function ProviderPage() {
  const { provider: individualProvider, organization } = useLoaderData() as {
    provider: ProviderObject;
    organization: OrganizationObject;
  };
  const navigate = useNavigate();
  const provider = individualProvider || organization;
  const photoList = [samplePhoto1, samplePhoto2];
  const firstName = provider.name.split(' ')[0];
  const photoSrc = provider.profile_photo
    ? import.meta.env.VITE_S3_URL + provider.profile_photo
    : photoList[Math.floor(Math.random() * photoList.length)];

  return (
    <div className="provider-container full">
      <div className="provider-actions">
        <span>
          <Icon type="arrow_back" />
          <a
            onClick={() => {
              navigate(-1);
            }}>
            back
          </a>
        </span>
        <a
          onClick={(e) => {
            alert(
              `DEVELOPER NOTE: This will send an email to ${provider.email}. Are you sure?`
            );
            const message = prompt(
              "Leave a note for the provider so they can fix what's wrong."
            );
            if (message)
              confirmChoice(() => {
                addHash(provider.id, message);
              }, `send "${message}" to ${provider.name}?`);
          }}>
          request an edit
        </a>
      </div>
      <div className="provider-header">
        <span className="provider-container"></span>
        <div className="provider-image">
          <Bookmark provider={provider} />
          <img src={photoSrc} />
        </div>
        <section className='information-container'>
          <span>
            <h2>{provider.name}</h2>
            <p>{provider.business_name}</p>
            <p>
              Type of care:{' '}
              {provider.services?.map((service) => service.name + ', ')}
            </p>
            <Address provider={provider} />
          </span>
          <span>
            <p>Phone number: {provider.phone}</p>
            <p>Email: {provider.email}</p>
            {provider.website ? <p>Website: {provider.website}</p> : ' '}
          </span>
        </section>
      </div>
      <div>
        <h3>About {firstName}</h3>
        <p>{provider.role}</p>
        <p>{provider.overview}</p>
        <h3>Professional Details</h3>
        <p>
          Payment Accepted:{' '}
          {provider.paymentOptions?.map((payment) => payment.name + ', ')}
        </p>
        {provider.certifications ? (
          <p>
            Certifications:{' '}
            {provider.certifications?.map(
              (certification) => certification.name + ', '
            )}
          </p>
        ) : (
          ''
        )}

        {provider?.bio ? <h3>Personal Details</h3> : ''}

        {/* {provider.pronouns} */}
        {provider.languages_spoken}
        <h3>Contact {firstName}</h3>
        <p>{provider.phone}</p>
        <p>{provider.email}</p>
        <p>{provider.website}</p>
      </div>
      {/* <div>
        <Name provider={provider}>
          <p>{provider.overview}</p>
        </Name>
        <div className="option-list-container">
          <span>
            <label>Payment accepted:</label>
            <ul>
              {provider.paymentOptions?.map((payment) => {
                return <li key={payment.id}>{payment.name}</li>;
              })}
            </ul>
          </span>
          <span>
            <label>Certifications:</label>
            <ul>
              {provider.certifications?.map((certification) => {
                return <li key={certification.id}>{certification.name}</li>;
              })}
            </ul>
          </span>
        </div>
        <Contact provider={provider} title={provider.name.split(' ')[0]} />
      </div> */}
    </div>
  );
}
