import { useFormContext } from '../../utils/formContext';
import { PageStateIndicator } from './PageStateIndicator';

export const PageStateIndicatorList = () => {
  const { pageState, pageStateTitles } = useFormContext();

  return (
    <ol>
      {pageStateTitles.map((pageStateTitle, index) => {
        const id = index + 1;
        const state =
          id < pageState ? 'complete' : id === pageState ? 'active' : '';
        const indicatorProps = { id, state };
        const props = {};
        return (
          <li
            className={`page-state-indicator ${state}`}
            key={`PageStateIndicator${id}`}>
            <PageStateIndicator {...indicatorProps} />
            {pageStateTitle}
          </li>
        );
      })}
    </ol>
  );
};
