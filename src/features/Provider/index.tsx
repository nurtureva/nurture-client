import ProviderPage from './layouts/ProviderPage';
import ProviderTablePage from './layouts/ProviderTablePage';
import Search from './components/Search/Search';

const providerTableContent = {
  Content: ProviderTablePage,
  className: 'directory'
};
const providerPageContent = { Content: ProviderPage };

export { providerTableContent, providerPageContent };
