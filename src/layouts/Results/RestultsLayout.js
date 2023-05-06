import { Outlet, useLoaderData } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation';

export default function ResultsLayout() {
  const providers = useLoaderData();
  console.log(providers);
  return (
    <div className="nurture-directory-main-container">
      test
      <Outlet context={providers} />
    </div>
  );
}
