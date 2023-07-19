import { useEffect, useState } from 'react';
import { Option, OptionsObject } from '@/types';
import { toggleFilterMenu } from '@/utils/helpers';
import { useLocation } from 'react-router-dom';
import { Icon } from '@/components';

export const Filters = ({
  options,
  updateFilters
}: {
  options: OptionsObject;
  updateFilters: Function;
}) => {
  const location = useLocation();
  const filters = location.state?.filters;
  const { services, paymentOptions } = options;
  const [serviceFilters, setServiceFilters] = useState<number[]>(
    filters?.services || []
  );
  const [paymentFilters, setPaymentFilters] = useState<number[]>([]);
  const [bookmarkFilter, setBookmarkFilter] = useState(
    location.pathname === '/bookmarks' ? true : false
  );
  const clearFilters = () => {
    setPaymentFilters([]);
    setServiceFilters([]);
    setBookmarkFilter(false);
  };

  useEffect(() => {
    updateFilters({
      services: serviceFilters,
      paymentOptions: paymentFilters,
      bookmarkFilter
    });
  }, [serviceFilters, paymentFilters, bookmarkFilter]);
  return (
    <div className="provider-filters">
      <Icon type="clear" onClick={toggleFilterMenu} />
      <span>
        <h4>Filter Results</h4>
        <a onClick={clearFilters}>clear filters</a>
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
      {/* <div>
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
      </div> */}
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
