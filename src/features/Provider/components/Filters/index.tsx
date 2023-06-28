import { useEffect, useState } from 'react';
import { Option, OptionsObject } from '@/types';
import './filters.scss';
import { toggleFilterMenu } from '@/utils/helpers';

const Filters = ({
  options,
  updateFilters
}: {
  options: OptionsObject;
  updateFilters: Function;
}) => {
  const { services, paymentOptions } = options;
  const [serviceFilters, setServiceFilters] = useState<string[]>([]);
  const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
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
      <i className="icon-clear" onClick={toggleFilterMenu} />
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
  filterGroup: string[];
  setFilterGroup: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const updateFilterList = (value: string, checked: boolean) => {
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
                    updateFilterList(e.target.value, e.target.checked);
                  }}
                  checked={filterGroup.includes(`${choice.id}`)}
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

export default Filters;
