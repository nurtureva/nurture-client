import { useFormContext } from 'react-hook-form';
import { Initializer } from '../..';
import { FormType } from '../../types';
import { useContextInitializer } from '../../utils/formContext';
import { FormPageSwitcher } from '../FormPageSwitcher';
import { PageStateIndicatorList } from '../PageStateIndicatorList';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components';

export const FormManager = ({ formType }: { formType: FormType }) => {
  const [FormContext, value] = useContextInitializer(formType);
  const [submissionResponse, setSubmissionResponse] = useState('');
  console.log(submissionResponse);

  return (
    <FormContext.Provider value={value}>
      <div className="content-wrapper">
        <div className="content-main form-container">
          {submissionResponse ? (
            <div>
              {submissionResponse === 'error' ? (
                'something went wrong. Probably the name you entered has already been taken'
              ) : (
                <Button to={`/provider/${submissionResponse}`}>
                  Check out your new profile!
                </Button>
              )}
            </div>
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
