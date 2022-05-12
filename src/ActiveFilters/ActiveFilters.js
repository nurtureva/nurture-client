import { useState, useEffect } from 'react';
import { Tag } from 'antd';

export default function ActiveFilters(props) {
  const [activeFilters, setActiveFilters] = useState({});

  const handleClose = (arr) => {
    if (arr[0] === 'name') {
      props.setSearch('');
    } else {
      props.removeFilter(arr[0], arr[1]);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    props.setSearch('');
    props.removeFilter('all');
  };

  const unCamelCase = (string) => {
    return string
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase();
  };

  useEffect(() => {
    setActiveFilters({ ...props.filters, ...props.searchTerm });
  }, [props]);

  const renderActiveFilters = () => {
    const filtersArray = Object.entries(activeFilters);

    const finalArray = [];
    filtersArray.map((filter) => {
      if (typeof filter[1] === 'string' && filter[1]) {
        finalArray.push([filter[0], filter[1]]);
      } else if (filter[1].length) {
        filter[1].forEach((filterName) => {
          finalArray.push([unCamelCase(filter[0]), filterName]);
        });
      } else if (filter[1].value) {
        finalArray.push([unCamelCase(filter[0]), filter[1].value]);
      }
    });
    const activeFilterElementArray = finalArray.map((filterArr) => {
      return (
        <Tag
          closable
          onClose={() => {
            handleClose(filterArr);
          }}
          key={JSON.stringify(filterArr)}>
          {`${filterArr[0]}: ${filterArr[1]}`}
        </Tag>
      );
    });

    //if there are any tags, add a clear all tag
    if (activeFilterElementArray.length) {
      activeFilterElementArray.push(
        <Tag
          closable
          key={'clear'}
          onClose={(e) => {
            handleClear(e);
          }}>
          Clear All
        </Tag>
      );
    }

    return activeFilterElementArray;
  };

  return <div className="active-filters">{renderActiveFilters()}</div>;
}
