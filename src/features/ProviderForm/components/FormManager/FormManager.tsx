import { Initializer } from '../..';
import { FormType } from '../../types';
import { useContextInitializer, useFormContext } from '../../utils/formContext';
import { FormPageSwitcher } from '../FormPageSwitcher';
import { PageStateIndicatorList } from '../PageStateIndicatorList';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components';
import { ProviderOptions } from '@/types';

export const FormManager = ({ formType }: { formType: FormType }) => {
  const [FormContext, value] = useContextInitializer(formType);
  const [submissionResponse, setSubmissionResponse] = useState('');
  // console.log(submissionResponse);

  return (
    <FormContext.Provider value={value}>
      <div className="content-wrapper">
        <div className="content-main form-container">
          {submissionResponse ? (
            <SubmissionPage {...{ submissionResponse, formType }} />
          ) : (
            <section>
              <>
                <PageStateIndicatorList />
                <FormPageSwitcher {...{ setSubmissionResponse }} />
              </>
            </section>
          )}
        </div>
      </div>
    </FormContext.Provider>
  );
};

const SubmissionPage = ({
  submissionResponse,
  formType
}: {
  submissionResponse: any;
  formType: string;
}) => {
  console.log(submissionResponse);
  const {
    formData: { newProvider },
    formState: {
      formType: { formFields }
    }
  } = useFormContext();
  const { general, ...otherStuff } = newProvider;
  const providerOptions = useLoaderData() as ProviderOptions;

  const providerList = { ...general, ...otherStuff };
  const test = Object.keys(formFields)
    .flatMap((fieldName) => {
      return formFields[fieldName].map((field) => {
        // const dbName = field.dbName || field.props.dbName || field.props.formKey;
        const dbName = field.props.dbName;
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
      });
    })
    .filter((item) => item !== undefined);
  return (
    <section className="submission-section">
      {submissionResponse === 'error' ? (
        'something went wrong. Probably the name you entered has already been taken'
      ) : (
        <>
          <h2>Thank You!</h2>
          <p>
            {submissionResponse}
            <Link
              to={`/${
                formType === 'individual' ? 'provider' : formType
              }/${submissionResponse}`}>
              Check out your new profile!
            </Link>
          </p>
          <h3>Your Submission</h3>
          <form>
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
          </form>
          <Button to="/">Return home</Button>
        </>
      )}
    </section>
  );
};
