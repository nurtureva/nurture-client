import { useLoaderData } from 'react-router-dom';
import { ProviderObject } from '@/types';
import OptionList from '../components/OptionList';
import ProviderList from '../components/ProviderList';

export default function AdminDashboard() {
  //extend main page loader to also get reports as well as pending providers !!!!!!!!!!!!!
  const { pendingProviders, providers, currentReports } = useLoaderData() as {
    pendingProviders: ProviderObject[];
    providers: ProviderObject[];
    currentReports: any;
  };

  return (
    <div>
      <span className="analytics-container">
        {/* <h3>{currentReports.pageViews} monthly page views</h3> */}
        {/* <h3>and {currentReports.uniqueUsers} unique monthly users</h3> */}
      </span>
      <OptionList endpoint="services" title="Services" />
      <OptionList endpoint="certifications" title="Certifications" />
      <OptionList endpoint="payment-options" title="Payment Options" />
      <h4>Pending Providers</h4>
      <ProviderList providers={pendingProviders} isPending={true} />
      <h4>Current Providers</h4>
      <ProviderList providers={providers} isPending={false} />
    </div>
  );
}
