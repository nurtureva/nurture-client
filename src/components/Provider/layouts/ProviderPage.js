import Contact from '../components/Contact/Contact';
import Name from '../components/Name/Name';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function ProviderPage() {
  const { filteredProviders: providers } = useOutletContext();
  const url = window.location.href.split('/');
  const userId = url[url.length - 1];
  const provider = providers.find((provider) => provider.id == userId);
  const navigate = useNavigate();
  console.log(provider);
  return (
    <div className="provider-container">
      <div className="provider-header">
        <button
          onClick={() => {
            navigate('/results');
          }}>
          {'< back'}
        </button>
        <button>bookmark</button>
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
              {provider.paymentOptions.map((payment) => {
                return <li key={payment.id}>{payment.name}</li>;
              })}
            </ul>
          </span>
          <span>
            <label>Certifications:</label>
            <ul>
              {provider.certifications.map((certification) => {
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
