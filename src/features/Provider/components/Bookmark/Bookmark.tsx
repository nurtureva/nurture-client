import { useEffect, useState } from 'react';
import {
  getBookmarkedProviders,
  setBookmarkedProviders
} from '@/utils/helpers';
import { ProviderObject } from '@/types';

export const Bookmark = ({ provider }: { provider: ProviderObject }) => {
  const [isBookmarked, setIsBookmarked] = useState(provider.isBookmarked);
  useEffect(() => {
    const bookmarkedProviders = getBookmarkedProviders();
    const alreadyBookmared = bookmarkedProviders.includes(provider.id);

    if (isBookmarked && !alreadyBookmared) {
      bookmarkedProviders.push(provider.id);
    } else if (!isBookmarked && alreadyBookmared) {
      const bookmarkIndex = bookmarkedProviders.indexOf(provider.id);
      bookmarkedProviders.splice(bookmarkIndex, 1);
    }
    setBookmarkedProviders(JSON.stringify(bookmarkedProviders));
    provider.isBookmarked = isBookmarked;
  }, [isBookmarked]);

  return (
    <>
      <input
        className="bookmark-checkbox"
        id={`${provider.id}-bookmark`}
        type="checkbox"
        checked={isBookmarked}
        onChange={(e) => {
          setIsBookmarked(e.target.checked);
        }}
      />
      <label htmlFor={`${provider.id}-bookmark`} className="bookmark-label" />
    </>
  );
};
