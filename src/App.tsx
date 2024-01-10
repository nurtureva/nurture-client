import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  useProviderLoader,
  useMainPageLoader,
  useOptionsLoader,
  useAdminLoader,
  useEditFormLoader,
  useOrganizationLoader
} from '@/api/loaders';
import { initBookmarkedProviders } from '@/utils/helpers';
import { Endpoint } from '@/types';
//page layouts
import LayoutWrapper from '@/layouts/LayoutWrapper';
import PageLayout from '@/layouts/PageLayout';
import pageNotFoundContent from '@/layouts/404';
import errorContent from '@/layouts/error';
import Dashboard from '@/layouts/Dashboard';
import CareProvider from '@/layouts/CareProviderHub';
//features
import {
  bookmarkTableContent,
  providerPageContent,
  providerTableContent
} from '@/features/Provider';
import { adminContent } from '@/features/Admin';
import { FormManager, IntakeForm } from '@/features/ProviderForm';
import { LearnMore } from './layouts/LearnMore';

const navRoutes: Endpoint[] = [
  {
    name: 'Home',
    path: '',
    element: <Dashboard />
  },
  {
    name: 'Find Care',
    path: 'results',
    loader: useMainPageLoader,
    element: <PageLayout {...providerTableContent} />,
    errorElement: <PageLayout {...errorContent} />
  },
  {
    name: 'Bookmarks',
    path: 'bookmarks',
    loader: useMainPageLoader,
    element: <PageLayout {...bookmarkTableContent} />,
    errorElement: <PageLayout {...errorContent} />
  },
  {
    name: 'Care Provider Hub',
    path: 'provider-home',
    element: <CareProvider />
  },
  {
    name: 'Learn More',
    path: 'learn-more',
    element: <LearnMore />
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
          path: 'provider/:userId',
          element: <PageLayout {...providerPageContent} />,
          errorElement: <PageLayout {...errorContent} />,
          loader: useProviderLoader
        },
        {
          path: 'organization/:userId',
          element: <PageLayout {...providerPageContent} />,
          errorElement: <PageLayout {...errorContent} />,
          loader: useOrganizationLoader
        },
        {
          path: 'provider-form',
          loader: useOptionsLoader,
          element: <IntakeForm />,
          errorElement: <PageLayout {...errorContent} />
        },
        {
          path: 'admin',
          loader: useAdminLoader,
          element: <PageLayout {...adminContent} />
        },
        {
          path: ':userId/edit/:hash',
          element: <FormManager formType="individual" />,
          loader: useEditFormLoader
        },
        {
          path: '*',
          element: <PageLayout {...pageNotFoundContent} />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
