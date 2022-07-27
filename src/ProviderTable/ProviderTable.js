import Provider from '../Provider/Provider';
import './ProviderTable.css';

export default function ProviderTable(props) {
  const renderProviders = () => {
    return props.providers.map((provider) => {
      if (provider.name) {
        return <Provider provider={provider} key={provider.id} />;
      }
    });
  };

  const renderNoProviders = () => {
    return <div className="no-results-found">No results found...</div>;
  };

  return (
    <div className="provider-table-container">
      <h2>
        {props.providers.length === 1
          ? 'There is 1 provider'
          : `There are ${props.providers.length} providers`}
      </h2>
      {props.providers.length ? renderProviders() : renderNoProviders()}
    </div>
  );
}
