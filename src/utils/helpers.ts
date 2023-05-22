const toggleFilterMenu = () => {
  const filterElement = document.getElementsByClassName('provider-filters')[0];
  if (filterElement instanceof HTMLElement) {
    if (filterElement.style.display === 'block') {
      filterElement.style.display = 'none';
    } else filterElement.style.display = 'block';
  }
};

export { toggleFilterMenu };
