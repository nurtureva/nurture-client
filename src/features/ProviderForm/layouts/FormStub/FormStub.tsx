import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../../components/FormItem';
import { PageStateTitle } from '@/types';
import { ButtonGroup } from '../../components/ButtonGroup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { IssuesCloseOutlined } from '@ant-design/icons';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formData: { newProvider },
    formState: {
      formType: { formFields },
      updateState,
      next
    }
  } = useFormContext();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
  } = useForm({
    defaultValues: newProvider,
    mode: 'onBlur'
  });
  const {errors, isSubmitted} = formState;
  

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
      <span className="form-error">
        {isSubmitted && errors?.general &&
          `Please enter a valid ${Object.keys(errors.general).join(', ')}.`}
      </span>
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
