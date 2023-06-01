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
import { useFormAction } from '@/features/ProviderForm/utils/formActions';

const navRoutes: Endpoint[] = [
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
  initBookmarkedProviders();

  const router = createBrowserRouter([
    {
      element: <LayoutWrapper navRoutes={navRoutes} />,
      children: [
        ...navRoutes,
        {
          path: 'results/:userId',
          element: <PageLayout {...providerPageContent} />,
          loader: useProviderLoader
        },
        {
          path: 'provider-form',
          loader: useOptionsLoader,
          element: <FormManager formAction={useFormAction('create')} />
        },
        {
          path: 'admin',
          loader: useAdminLoader,
          element: <PageLayout {...adminContent} />
        },
        {
          path: ':userId/edit/:hash',
          element: <FormManager formAction={useFormAction('update')} />,
          loader: useEditFormLoader
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
