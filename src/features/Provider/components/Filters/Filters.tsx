import { useEffect, useState } from 'react';
import { Option, OptionsObject } from '@/types';
import { toggleFilterMenu } from '@/utils/helpers';
import { useLocation } from 'react-router-dom';
import { Icon } from '@/components';

export const Filters = ({
  options,
  updateFilters,
  setProviderType,
  providerType,
  modalHandler
}: {
  options: OptionsObject;
  updateFilters: Function;
  setProviderType: Function;
  providerType: string;
  modalHandler?: () => void;
}) => {
  const location = useLocation();
  const filters = location.state?.filters;
  const { services, paymentOptions } = options;
  const [serviceFilters, setServiceFilters] = useState<number[]>(
    filters?.services || []
  );
  const [paymentFilters, setPaymentFilters] = useState<number[]>([]);
  const [bookmarkFilter, setBookmarkFilter] = useState(
    location.pathname.includes('/bookmarks') ? true : false
  );
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 700);
  const clearFilters = () => {
    setPaymentFilters([]);
    setServiceFilters([]);
    // setBookmarkFilter(false);
  };

  useEffect(() => {
    updateFilters({
      services: serviceFilters,
      paymentOptions: paymentFilters,
      bookmarkFilter
    });
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [serviceFilters, paymentFilters, bookmarkFilter]);
  return (
    <div className="provider-filters">
      {isMobileView && <Icon type="carrot_back" onClick={modalHandler} />}
      <span>
        <h4>Filter Results</h4>
        <a onClick={clearFilters}>clear filters</a>
      </span>
      <span className="provider-type-toggle">
        <label htmlFor="individual">Individual</label>
        <input
          type="radio"
          value="individual"
          name="provider-type"
          id="individual"
          checked={providerType === 'individual'}
          onChange={(e) => {
            setProviderType(e.target.value);
          }}
        />
        <label htmlFor="organization">Organization</label>
        <input
          type="radio"
          value="organization"
          name="provider-type"
          id="organization"
          checked={providerType === 'organization'}
          onChange={(e) => {
            setProviderType(e.target.value);
          }}
        />
      </span>
      <FilterList
        optionList={services}
        title={'Type of care'}
        setFilterGroup={setServiceFilters}
        filterGroup={serviceFilters}
      />
      <FilterList
        optionList={paymentOptions}
        title={'Payment accepted'}
        setFilterGroup={setPaymentFilters}
        filterGroup={paymentFilters}
      />
      <div>
        <label>My bookmarks</label>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={(e) => {
                  setBookmarkFilter(e.target.checked);
                }}
                checked={bookmarkFilter}
              />
              Bookmarked profiles
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

const FilterList = ({
  optionList,
  title,
  filterGroup,
  setFilterGroup
}: {
  optionList: Option[];
  title: string;
  filterGroup: number[];
  setFilterGroup: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const updateFilterList = (value: number, checked: boolean) => {
    if (checked) setFilterGroup([...filterGroup, value]);
    else {
      const index = filterGroup.indexOf(value);
      const newFilters = [...filterGroup];
      newFilters.splice(index, 1);

      setFilterGroup(newFilters);
    }
  };
  return (
    <div>
      <label>{title}:</label>
      <ul>
        {optionList.map((choice) => {
          return (
            <li key={choice.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    updateFilterList(Number(e.target.value), e.target.checked);
                  }}
                  checked={filterGroup.includes(choice.id)}
                  value={choice.id}
                />
                {choice.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
