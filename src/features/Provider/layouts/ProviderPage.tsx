import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProviderObject } from '@/types';
import samplePhoto1 from '@/assets/images/profile-1.png';
import samplePhoto2 from '@/assets/images/profile-2.png';
import { Bookmark } from '../components/Bookmark';
import { Button, Icon } from '@/components';

export default function ProviderPage() {
  const { provider } = useLoaderData() as { provider: ProviderObject };
  const navigate = useNavigate();
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
        <Bookmark provider={provider} />
        <a>request an edit</a>
      </div>
      <div className="provider-header">
        <img src={photoSrc} />
        <span>
          <h2>{provider.name}</h2>
          <p>{provider.business_name}</p>
          <p>
            Type of care:{' '}
            {provider.services?.map((service) => service.name + ', ')}
          </p>
        </span>
        <span>
          <Button type="primary">test</Button>
        </span>
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
        <p>
          Certifications:{' '}
          {provider.certifications?.map(
            (certification) => certification.name + ', '
          )}
        </p>
        <h3>Personal Details</h3>
        {provider.pronouns}
        {provider.languages_spoken}
        <h3>Contact</h3>
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
