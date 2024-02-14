import { useLoaderData } from 'react-router-dom';
import { OrganizationObject, ProviderObject } from '@/types';
import './dashboard.scss';
import OptionList from '../components/OptionList';
import ProviderList from '../components/ProviderList';

export default function AdminDashboard() {
  //extend main page loader to also get reports as well as pending providers !!!!!!!!!!!!!
  const {
    pendingProviders,
    providers,
    currentReports,
    organizations,
    pendingOrganizations
  } = useLoaderData() as {
    pendingProviders: ProviderObject[];
    pendingOrganizations: OrganizationObject[];
    providers: ProviderObject[];
    organizations: OrganizationObject[];
    currentReports: any;
  };

  return (
    <div className="admin-wrapper">
      {/* <span className="analytics-container"> */}
      {/* <h3>{currentReports.pageViews} monthly page views</h3> */}
      {/* <h3>and {currentReports.uniqueUsers} unique monthly users</h3> */}
      {/* </span> */}
      {/* <OptionList endpoint="services" title="Services" />
      <OptionList endpoint="certifications" title="Certifications" />
      <OptionList endpoint="payment-options" title="Payment Options" /> */}
      <div>
        <h4>Pending Providers</h4>
        <ProviderList
          providers={pendingProviders}
          isPending={true}
          endpoint="providers"
        />
      </div>
      <div>
        <h4>Current Providers</h4>
        <ProviderList
          providers={providers}
          isPending={false}
          endpoint="providers"
        />
      </div>
      <div>
        <h4>Pending Organizations</h4>
        <ProviderList
          providers={pendingOrganizations}
          isPending={true}
          endpoint="organizations"
        />
      </div>
      <div>
        <h4>Current Organizations</h4>
        <ProviderList
          providers={organizations}
          isPending={false}
          endpoint="organizations"
        />
      </div>
    </div>
  );
}
