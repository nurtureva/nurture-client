import { useFormContext } from '../../utils/formContext';
import { PageStateIndicator } from './PageStateIndicator';

export const PageStateIndicatorList = () => {
  const {
    formState: { pageState, pageStateTitles, updateState }
  } = useFormContext();

  return (
    <ol>
      {pageStateTitles.map((pageStateTitle, index) => {
        const id = index + 1;
        const state =
          id < pageState ? 'complete' : id === pageState ? 'active' : '';
        const indicatorProps = { id, state };
        return (
          <li
            className={`page-state-indicator ${state}`}
            key={`PageStateIndicator${id}`}
            onClick={() => updateState({ pageState: id })}>
            <PageStateIndicator {...indicatorProps} />
            {pageStateTitle}
          </li>
        );
      })}
    </ol>
  );
};
