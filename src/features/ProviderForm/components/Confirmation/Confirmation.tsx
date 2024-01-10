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
  const { demographics, general, ...otherStuff } = provider;
  //flatten general
  const providerList = { ...general, ...otherStuff };
  console.log(Object.entries(providerList));
  const tesdt = pageStateTitles
    .map((title) => {
      const currentSection = formFields.filter(
        (field) => field.stubName === title
      );
      return currentSection.map((field) => {
        const dbName: string =
          field.dbName || field.props.dbName || field.props.formKey;

        if (providerList[dbName]) {
          const userResponse =
            typeof providerList[dbName] !== 'string'
              ? providerOptions[dbName]
                  .filter((optionObject) =>
                    providerList[dbName].includes(optionObject.id.toString())
                  )
                  .map((optionObject) => optionObject.name)
                  .join()
              : providerList[dbName];
          return [field.name, userResponse];
        }
      });
    })
    .flat()
    .filter((item) => item !== undefined);

  return (
    <ul>
      {Object.entries(providerList).map((entry) => {
        if (!!entry[0])
          return (
            <li>
              {entry[0]}: {entry[1]}
            </li>
          );
      })}
    </ul>
  );
};
