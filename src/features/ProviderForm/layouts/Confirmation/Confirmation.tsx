import { useLoaderData } from 'react-router-dom';
import { useFormContext } from '../../utils/formContext';
import { ButtonGroup } from '../../components/ButtonGroup';

export const Confirmation = () => {
  const {
    formData: { pictures, newProvider: provider },
    formState: {
      formType: { pageStateTitles },
      getFormValues
    }
  } = useFormContext();
  pageStateTitles.pop();
  pageStateTitles.pop();
  const formValues = getFormValues();
  if (!provider) return null;
  console.log(provider);
  return (
    <div className="confirmation-section">
      <p>
        Please take a moment to review your responses before submitting. To make
        changes, click the “back” button below, or use the numbered links to
        jump to a section.
      </p>
      <ul className="confirmation-list">
        {formValues.map((entry: string[], i: number) => {
          if (!!entry[0])
            return (
              <li key={i}>
                <span>{entry[0]}:</span> {entry[1]}
              </li>
            );
        })}
      </ul>
      <ButtonGroup isConfirmation={true} />
    </div>
  );
};
