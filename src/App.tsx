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
import pageNotFoundContent from '@/layouts/404';
import errorContent from '@/layouts/error';
import Dashboard from '@/layouts/Dashboard';
import CareProvider from '@/layouts/CareProvider';
//features
import { providerPageContent, providerTableContent } from '@/features/Provider';
import { adminContent } from '@/features/Admin';
import { FormManager } from '@/features/ProviderForm';

const navRoutes: Endpoint[] = [
  {
    name: 'Home',
    path: '',
    element: <Dashboard />
  },
  {
    name: 'Directory',
    path: 'results',
    loader: useMainPageLoader,
    element: <PageLayout {...providerTableContent} />,
    errorElement: <PageLayout {...errorContent} />
  },
  {
    name: 'Bookmarks',
    path: 'bookmarks',
    loader: useMainPageLoader,
    element: <PageLayout {...providerTableContent} />,
    errorElement: <PageLayout {...errorContent} />
  },
  {
    name: 'Care Provider Home',
    path: 'provider-home',
    element: <CareProvider />
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
