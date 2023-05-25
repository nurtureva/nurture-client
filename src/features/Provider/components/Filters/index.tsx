import { useEffect, useState } from 'react';
import { Option, OptionsObject } from '../../types';

const Filters = ({
  options,
  updateFilters
}: {
  options: OptionsObject;
  updateFilters: Function;
}) => {
  const { services, paymentOptions, certifications } = options;
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
      <h4>Filters</h4>
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
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            setBookmarkFilter(e.target.checked);
          }}
          checked={bookmarkFilter}
        />
        Bookmarks
      </label>
      <button onClick={clearFilters}>clear filters</button>
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
