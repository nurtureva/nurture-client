import { useLoaderData } from 'react-router-dom';
import { Option, OrganizationObject, ProviderObject } from '@/types';
import { ProviderTable } from '../components/ProviderTable';
import { Filters } from '../components/Filters';
import { Search } from '../components/Search';
import { useFilterReducer } from '../utils/filterReducer';
import { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { Icon } from '@/components';

type ProviderType = 'individual' | 'organization';

export default function ProviderTablePage() {
  const { providers, organizations, services, paymentOptions, certifications } =
    useLoaderData() as {
      providers: ProviderObject[];
      organizations: OrganizationObject[];
      services: Option[];
      paymentOptions: Option[];
      certifications: Option[];
    };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 700);
  const [providerType, setProviderType] = useState<ProviderType>('individual');
  const filterOptions = { services, paymentOptions, certifications };
  const { updateSearch, updateFilters, initialSearch, filteredProviders } =
    useFilterReducer(providerType === 'individual' ? providers : organizations);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal
          title="Note: "
          size="medium"
          closeHandler={() => setIsModalOpen(false)}>
          <p>
            <strong>Disclaimer:</strong> Individuals and organizations listed in
            this directory are for informational purposes only. Nurture does not
            endorse or guarantee the quality of services of any of these
            individuals or organizations. While we do our best to keep
            information updated, there may have been changes since this
            information was posted. Always contact the providers to verify all
            information before making appointments or using services to ensure
            that you receive services and support appropriate for your needs.
            <div></div>When contacting a provider from this list, please
            indicate that you received their name from this directory.
          </p>
        </Modal>
      )}
      <section>
        <h1>Find Care</h1>
        <p>
          The Birth and Early Parenting Resource Directory will help connect you
          with doulas, lactation support providers, and mental health care
          professionals in the Richmond, Virginia area. Jump to one of our main
          categories of care, use the search bar to enter a keyword or a
          practitioner’s name, or browse our full directory below.
        </p>
        <p className="popup-p-tag" onClick={() => setIsModalOpen(true)}>
          <Icon type="arrow_right" />
          Note
        </p>
      </section>
      <div className="bg-tan">
        <Search updateSearch={updateSearch} initialTerms={initialSearch} />
      </div>
      <div className="results-page">
        {isMobileView && (
          <p
            className="popup-p-tag"
            onClick={() => setIsFiltersModalOpen(true)}>
            <Icon type="arrow_right" />
            Filters
          </p>
        )}
        {isFiltersModalOpen && isMobileView && (
          <div
            className="backdrop"
            onClick={() => setIsFiltersModalOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Filters
                modalHandler={() => setIsFiltersModalOpen(!isFiltersModalOpen)}
                updateFilters={updateFilters}
                setProviderType={setProviderType}
                providerType={providerType}
                options={filterOptions}
              />
            </div>
          </div>
        )}
        {!isMobileView && (
          <Filters
            updateFilters={updateFilters}
            setProviderType={setProviderType}
            providerType={providerType}
            options={filterOptions}
          />
        )}
        <ProviderTable
          providerType={providerType}
          providers={filteredProviders}
        />
      </div>
    </>
  );
}
