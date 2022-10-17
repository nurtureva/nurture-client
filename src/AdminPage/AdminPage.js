import { useEffect, useState } from 'react';
import PendingProviders from '../PendingProviders/PendingProviders';

export default function AdminPage() {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [currentReports, setCurrentReports] = useState([]);
  const getPendingProviders = async () => {
    const providers = await fetch(
      `${process.env.REACT_APP_BASE_URL}/admin/pending-providers`,
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
      const reportsRes = await getMonthlyReports();
      setCurrentReports(reportsRes);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      <h3>{currentReports.pageViews} monthly page views</h3>
      <h3>and {currentReports.uniqueUsers} unique monthly users</h3>

      <PendingProviders pendingProviders={pendingProviders} />
    </div>
  );
}
