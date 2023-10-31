import { ProviderObject } from '@/types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const toggleFilterMenu = () => {
  const filterElement = document.getElementsByClassName('provider-filters')[0];
  if (filterElement instanceof HTMLElement) {
    if (filterElement.style.display === 'block') {
      filterElement.style.display = 'none';
    } else filterElement.style.display = 'block';
  }
};

export const initBookmarkedProviders = () => {
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

export const mergeLocalStorage = (
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

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
};
