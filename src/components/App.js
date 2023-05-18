import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  useProviderLoader,
  useMainPageLoader,
  useOptionsLoader
} from '../utils/api';
//page layouts
import LayoutWrapper from '../layouts/LayoutWrapper';
import PageLayout from '../layouts/PageLayout';
import careProviderContent from '../layouts/content/careProvider';
import findCareContent from '../layouts/content/findCare';
import dashboardContent from '../layouts/content/dashboard';
//features
import AdminDashboard from '../layouts/AdminDashboard/AdminDashboard';
import {
  providerPageContent,
  providerTableContent
} from '../features/Provider';
import { useFormContent } from '../features/ProviderForm';

//make array of paths and pass that down to layoutwrapper. that way we can dynamically generate navlinks in the header and the footer
const endpoints = [
  {
    name: 'Home',
    path: '/',
    element: <PageLayout {...dashboardContent} />
  },
  {
    name: 'Find Care',
    path: 'find-care',
    element: <PageLayout {...findCareContent} />
  },
  {
    name: 'Directory',
    path: 'results',
    loader: useMainPageLoader,
    element: <PageLayout {...providerTableContent} />
  },
  {
    name: 'Care Provider Home',
    path: 'provider-home',
    element: <PageLayout {...careProviderContent} />
  }
];

export default function App() {
  const router = createBrowserRouter([
    {
      element: <LayoutWrapper navPaths={endpoints} />,
      children: [
        ...endpoints,
        {
          path: 'results/:userId',
          element: <PageLayout {...providerPageContent} />,
          loader: useProviderLoader
        },
        {
          path: 'provider-form',
          loader: useOptionsLoader,
          element: <PageLayout {...useFormContent()} />
        },
        {
          path: 'admin',
          element: <AdminDashboard />
        }
        // { path: ':userId/edit/:hash', element: <EditProviderForm /> }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
