import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../../components/FormItem';
import { PageStateTitle } from '@/types';
import { ButtonGroup } from '../../components/ButtonGroup';
import { useForm } from 'react-hook-form';
import { Icon } from '@/components';
import { unstable_usePrompt } from 'react-router-dom';
import { useEffect } from 'react';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formData: { newProvider },
    formState: {
      formType: { formFields },
      updateState,
      next
    }
  } = useFormContext();

  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    defaultValues: newProvider,
    mode: 'onBlur'
  });
  const { errors, isSubmitted, isDirty } = formState;

  // Block navigating elsewhere when data has been entered into the input
  unstable_usePrompt({
    message:
      'Are you sure you want to navigate away from the form?\nYou will lose your data if you proceed.',
    when: ({ currentLocation, nextLocation }) => {
      console.log(isDirty)
      if (!isDirty) return false;
      return currentLocation.key !== nextLocation.key;
    }
  });

  const { general, ...errorsWithoutGeneral } = errors;
  const flatErrors = { ...general, ...errorsWithoutGeneral };

  const profilePhotoMessage =
    'While not required, we highly recommend uploading a profile picture for your listing. From the perspective of parents seeking services, profile pictures can help create a visual connection with prospective providers.';

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        updateState({ newProvider: data });
        next();
      })}>
      {type === 'Demographics' && (
        <>
          <h4>Why do we collect demographic data?</h4>
          <p>
            Demographic information is collected in order to better understand
            the local perinatal health ecosystem and how providers reflect the
            populations that they serve. Some parents may wish to seek providers
            with similar identities as their own. Demographic information will
            not be displayed on your public-facing profile unless you choose to
            share it. De-identified data may be shared with other organizations
            seeking to improve conditions for pregnant and postpartum families.
            <br />
            <br />
            In our approach to data collection, we reviewed sources focused on
            more inclusive data collection practices, incorporated feedback from
            local parents and providers, and consulted with epidemiologists at
            the Virginia Department of Health. If you have suggestions for ways
            to improve our data collection, please reach out.
          </p>
        </>
      )}
      {isSubmitted && Object.keys(errors).length ? (
        <div className="form-error">
          <h4>
            <Icon type="error_outline" />
            Please correct the following fields:
          </h4>
          <ul>
            {Object.keys(flatErrors).map((error) => {
              return <li>{error}</li>;
            })}
          </ul>
        </div>
      ) : (
        ''
      )}
      {formFields[type].map((input) => {
        const needsConsent = type === 'Demographics';
        input.props = {
          ...input.props,
          register,
          errors,
          setValue,
          getValues,
          needsConsent
        };
        return (
          <>
            {input.name === 'Profile photo' ? (
              <FormItem>
                <p>{profilePhotoMessage}</p>
              </FormItem>
            ) : (
              ''
            )}
            <FormItem input={input} key={input.props.dbName} />
          </>
        );
      })}
      <ButtonGroup isConfirmation={false} />
    </form>
  );
};