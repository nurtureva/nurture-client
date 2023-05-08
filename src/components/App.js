import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboard from '../layouts/AdminDashboard/AdminDashboard';
import Dashboard from '../layouts/Dashboard/Dashboard';
import FindCare from '../layouts/FindCare/FindCare';
import { EditProviderForm } from './NewProviderForm/NewProviderForm';
import Layout from '../layouts/Layout';
import ResultsLayout from '../layouts/Results/RestultsLayout';
import { getProviders } from '../utils/api';
import Results from '../layouts/Results/Results';
import ProviderPage from './Provider/layouts/ProviderPage';
export default function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Dashboard />
        },
        {
          path: '/find-care',
          element: <FindCare />
        },
        {
          path: 'admin',
          element: <AdminDashboard />
        },
        {
          path: 'results',
          element: <ResultsLayout />,
          loader: getProviders,
          children: [
            {
              element: <Results />,
              index: true
            },
            {
              path: ':userId',
              element: <ProviderPage />
            }
            // {
            //   path: ':userId',
            //   element: <ProviderPage />
            // }
          ]
        },
        { path: ':userId/edit/:hash', element: <EditProviderForm /> }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
