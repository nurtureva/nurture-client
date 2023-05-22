import ProviderPage from './layouts/ProviderPage';
import ProviderTablePage from './layouts/ProviderTablePage';

const Header = () => {
  return <p>choices...</p>;
};

const providerTableContent = { Content: ProviderTablePage, Header };
const providerPageContent = { Content: ProviderPage };

export { providerTableContent, providerPageContent };
