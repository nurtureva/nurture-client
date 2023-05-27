import { createPageContent } from '../ProviderForm/utils/helpers';
import AdminDashboard from './layouts/Dashboard';
export const adminContent = createPageContent(
  'Admin Dashboard',
  'Here you can approve pending providers, add and delete new options types',
  AdminDashboard
);
