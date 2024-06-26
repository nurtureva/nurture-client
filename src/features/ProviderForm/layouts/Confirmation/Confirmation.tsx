import { useLoaderData } from 'react-router-dom';
import { useFormContext } from '../../utils/formContext';
import { ButtonGroup } from '../../components/ButtonGroup';

function removeUndefinedKeys(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== false)
  );
}

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
  if (!provider) return null;
  const formValues = getFormValues();
  return (
    <div className="confirmation-section">
      <p>
        Please take a moment to review your responses before submitting. To make
        changes, click the “back” button below, or use the numbered links to
        jump to a section.
      </p>
      <ul className="confirmation-list">
        {formValues.map((entry: string[], i: number) => {
          if (!!entry[0]){
            const value = entry[1] instanceof File ? <img src={URL.createObjectURL(entry[1])}></img>  : entry[1]
            return (
              <li key={i}>
                <span>{entry[0]}:</span> {value}
              </li>
            );
          }
        })}
      </ul>
      <ButtonGroup isConfirmation={true} />
    </div>
  );
};
