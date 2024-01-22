import { useLoaderData } from 'react-router-dom';
import { useFormContext } from '../../utils/formContext';
import { ProviderOptions } from '@/types';

export const Confirmation = () => {
  const providerOptions = useLoaderData() as ProviderOptions;

  const {
    formData: { pictures },
    formFunctions: { getValues },
    formState: {
      formType: { formFields, pageStateTitles }
    }
  } = useFormContext();
  pageStateTitles.pop();
  pageStateTitles.pop();
  const provider = getValues();

  if (!provider) return null;
  const { general, ...otherStuff } = provider;
  //flatten general
  const providerList = { ...general, ...otherStuff };
  //page state titles
  console.log(formFields);
  const test = formFields
    .map((field) => {
      // const dbName = field.dbName || field.props.dbName || field.props.formKey;
      const dbName =
        'dbName' in field
          ? field.dbName
          : 'dbName' in field.props
          ? field.props.dbName
          : field.props.formKey;

      if (dbName && providerList[dbName]) {
        const userResponse =
          typeof providerList[dbName] !== 'string'
            ? providerOptions[dbName]
                .filter((optionObject) =>
                  providerList[dbName].includes(optionObject.id.toString())
                )
                .map((optionObject) => optionObject.name)
                .join(', ')
            : providerList[dbName];
        // console.log(field.name, userResponse);
        return [field.name, userResponse];
      }
    })
    .filter((item) => item !== undefined);

  return (
    <>
      <p>
        Please take a moment to review your responses before submitting. To make
        changes, click the “back” button below, or use the numbered links to
        jump to a section.
      </p>
      <ul className="confirmation-list">
        {test.map((entry: string[], i: number) => {
          if (!!entry[0])
            return (
              <li key={i}>
                <span>{entry[0]}:</span> {entry[1]}
              </li>
            );
        })}
      </ul>
    </>
  );
};
