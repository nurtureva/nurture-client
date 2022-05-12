import Provider from '../Provider/Provider';
import './ProviderTable.css';

export default function ProviderTable(props) {
  const renderProviders = () => {
    return props.providers.map((provider) => {
      if (provider.contact['Your First and Last Name']) {
        return (
          <Provider
            provider={provider}
            key={provider.formData['Respondent ID']}
          />
        );
      }
    });
  };
  return <div className="provider-table-container">{renderProviders()}</div>;
}
