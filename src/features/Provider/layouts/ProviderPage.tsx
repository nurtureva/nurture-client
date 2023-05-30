import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProviderObject } from '@/types';
import Contact from '../components/Contact';
import Name from '../components/Name';
import Bookmark from '../components/Bookmark';

export default function ProviderPage() {
  const { provider } = useLoaderData() as { provider: ProviderObject };
  const navigate = useNavigate();
  return (
    <div className="provider-container">
      <div className="provider-header">
        <button
          onClick={() => {
            navigate('/results');
          }}>
          {'< back'}
        </button>
        <Bookmark provider={provider} />
        <button>request an edit</button>
      </div>
      <div>
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
      </div>
    </div>
  );
}
