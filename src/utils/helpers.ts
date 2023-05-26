import { ProviderObject } from '@/types';

const toggleFilterMenu = () => {
  const filterElement = document.getElementsByClassName('provider-filters')[0];
  if (filterElement instanceof HTMLElement) {
    if (filterElement.style.display === 'block') {
      filterElement.style.display = 'none';
    } else filterElement.style.display = 'block';
  }
};

const initBookmarkedProviders = () => {
  const bookmarkedProviders: string | null = window.localStorage.getItem(
    'bookmarked-providers'
  );
  if (!bookmarkedProviders)
    window.localStorage.setItem('bookmarked-providers', '[]');
};

export const getBookmarkedProviders = () => {
  const stringifiedBookmarkedProviders = window.localStorage.getItem(
    'bookmarked-providers'
  );
  const bookmarkedProviders: number[] = stringifiedBookmarkedProviders
    ? JSON.parse(stringifiedBookmarkedProviders)
    : [];

  return bookmarkedProviders;
};

export const setBookmarkedProviders = (value: string) => {
  window.localStorage.setItem('bookmarked-providers', value);
};

export const mergeIsBookmarked = (
  toBeMerged: ProviderObject | ProviderObject[]
) => {
  const bookmarkedProviders = getBookmarkedProviders();
  if (Array.isArray(toBeMerged))
    toBeMerged.forEach((provider) => {
      provider.isBookmarked = bookmarkedProviders.includes(provider.id);
    });
  else {
    toBeMerged.isBookmarked = bookmarkedProviders.includes(toBeMerged.id);
  }
};

export { toggleFilterMenu, initBookmarkedProviders };
