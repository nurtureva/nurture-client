import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminDashboard from '../layouts/AdminDashboard/AdminDashboard';
import Dashboard from '../layouts/Dashboard/Dashboard';
import Provider from './Provider/Provider';
import Results from '../layouts/Results/Results';
import FindCare from '../layouts/FindCare/FindCare';
import { EditProviderForm } from './NewProviderForm/NewProviderForm';
import Layout from '../layouts/Layout';
import ResultsLayout from '../layouts/Results/RestultsLayout';
import { getProviders } from '../api/api';

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
              element: <Provider view="full" />
            }
          ]
        },
        { path: ':userId/edit/:hash', element: <EditProviderForm /> }
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route path="/" element={<Dashboard />} />
    //     {/* <Route path="admin" element={<AdminDashboard />} /> */}
    //     <Route path="results" element={<ResultsLayout loader={getProviders} />}>
    //       <Route index element={<Results />} />
    //       <Route path=":userId" element={<Provider view="full" />}></Route>
    //     </Route>
    //     <Route path=":userId/edit/:hash" element={<EditProviderForm />} />
    //   </Route>
    // </Routes>
  );
}
