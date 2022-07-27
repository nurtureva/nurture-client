import { useState, useEffect } from 'react';
import { Tag } from 'antd';

export default function ActiveFilters(props) {
  const [activeFilters, setActiveFilters] = useState({});

  const handleClose = (arr) => {
    if (arr[0] === 'name') {
      props.setSearch('');
    } else {
      props.removeFilter(camelCasify(arr[0]), arr[1]);
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

  const camelCasify = (string) => {
    return string.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
      if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  };

  useEffect(() => {
    setActiveFilters({ ...props.filters, ...props.searchTerm });
  }, [props]);

  const renderActiveFilters = () => {
    const filtersArray = Object.entries(activeFilters);
    const finalArray = [];
    filtersArray.map((filter) => {
      if (filter[1].length) {
        filter[1].forEach((filterName) => {
          finalArray.push([unCamelCase(filter[0]), filterName.name]);
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
