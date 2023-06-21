import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  useProviderLoader,
  useMainPageLoader,
  useOptionsLoader,
  useAdminLoader,
  useEditFormLoader
} from '@/api/loaders';
import { initBookmarkedProviders } from '@/utils/helpers';
import { Endpoint } from '@/types';
//page layouts
import LayoutWrapper from '@/layouts/LayoutWrapper';
import PageLayout from '@/layouts/PageLayout';
import careProviderContent from '@/layouts/content/careProvider';
import findCareContent from '@/layouts/content/findCare';
import dashboardContent from '@/layouts/content/dashboard';
//features
import { providerPageContent, providerTableContent } from '@/features/Provider';
import { adminContent } from '@/features/Admin';
import FormManager from '@/features/ProviderForm';
import pageNotFoundContent from '@/layouts/content/404';
import errorContent from '@/layouts/content/error';
import Dashboard from '@/layouts/contentComponents/Dashboard';
import FindCarePage from '@/layouts/contentComponents/FindCarePage';

const navRoutes: Endpoint[] = [
  {
    name: 'Home',
    path: '',
    element: <Dashboard />
  },
  {
    name: 'Find Care',
    path: 'find-care',
    element: <FindCarePage />
  },
  {
    name: 'Directory',
    path: 'results',
    loader: useMainPageLoader,
    element: <PageLayout {...providerTableContent} />,
    errorElement: <PageLayout {...errorContent} />
  },
  {
    name: 'Care Provider Home',
    path: 'provider-home',
    element: <PageLayout {...careProviderContent} />
  }
];

export default function App() {
  initBookmarkedProviders();

  const router = createBrowserRouter([
    {
      element: <LayoutWrapper navRoutes={navRoutes} />,
      errorElement: <PageLayout {...errorContent} />,
      children: [
        ...navRoutes,
        {
          path: 'results/:userId',
          element: <PageLayout {...providerPageContent} />,
          errorElement: <PageLayout {...errorContent} />,
          loader: useProviderLoader
        },
        {
          path: 'provider-form',
          loader: useOptionsLoader,
          element: <FormManager />,
          errorElement: <PageLayout {...errorContent} />
        },
        {
          path: 'admin',
          loader: useAdminLoader,
          element: <PageLayout {...adminContent} />
        },
        {
          path: ':userId/edit/:hash',
          element: <FormManager />,
          loader: useEditFormLoader
        },
        {
          path: '*',
          element: <PageLayout {...pageNotFoundContent} />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
