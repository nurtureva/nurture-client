import { useEffect, useState } from 'react';

import PendingProviders from './PendingProviders/PendingProviders';
import './AdminDashboard.scss';
import OptionList from './OptionList/OptionList';

export default function AdminDashboard() {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [currentReports, setCurrentReports] = useState([]);
  const getPendingProviders = async () => {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/providers?isPending=true`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  };
  const getProviders = async () => {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/providers`,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return providers.json();
  };

  const getMonthlyReports = async () => {
    const reports = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/reports`,
      {
        mode: 'cors',
        header: {
          'Content-Type': 'application/json'
        }
      }
    );

    return reports.json();
  };
  useEffect(async () => {
    try {
      const provRes = await getPendingProviders();
      setPendingProviders(provRes);
      const providersResponse = await getProviders();
      setProviders(providersResponse);
      const reportsRes = await getMonthlyReports();
      setCurrentReports(reportsRes);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <span className="analytics-container">
        <h3>{currentReports.pageViews} monthly page views</h3>
        <h3>and {currentReports.uniqueUsers} unique monthly users</h3>
      </span>
      <OptionList endpoint="services" name="Services" />
      <OptionList endpoint="certifications" name="Certifications" />
      <OptionList endpoint="payment-options" name="Payment Options" />
      <PendingProviders
        pendingProviders={pendingProviders}
        title={'Pending Providers'}
      />
      <PendingProviders
        pendingProviders={providers}
        title={'Current Providers'}
      />
    </div>
  );
}
