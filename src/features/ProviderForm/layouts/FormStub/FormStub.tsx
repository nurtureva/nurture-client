import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../../components/FormItem';
import { PageStateTitle } from '@/types';
import { ButtonGroup } from '../../components/ButtonGroup';
import { useForm } from 'react-hook-form';
import { FormSelector } from '../../components/FormSelector';

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
    formState: { errors }
  } = useForm({
    defaultValues: newProvider,
    mode: 'onBlur'
  });

  const profilePhotoMessage =
    'While not required, we highly recommend uploading a profile picture for your listing. From the perspective of parents seeking services, profile pictures can help create a visual connection with prospective providers.';
  const PreItem = ({ input }) => {
    if ((input.name !== 'Profile photo') && (type !== 'Demographics')) return null
    if (input.name === 'Profile photo') return (
      <FormItem>
        <p>{profilePhotoMessage}</p>
      </FormItem>
    )
    const testName = `${input.name}permission`;
    return (
      <FormItem
        input={{
          name: 'Would you like to display this on your public-facing profile?',
          Element: FormSelector,
          props: {
            dbName: { testName },
            optionsArray: [{ name: 'yes' }, { name: 'no' }],
            register: register,
            getValues: () => {},
            selection: 'single'
          }
        }}>
        {input.name === 'Profile photo' ? (
          <p>{profilePhotoMessage}</p>
        ) : (
          <label>
            <input type="checkbox"></input>
          </label>
        )}
      </FormItem>
    );
  };
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        updateState({ newProvider: data });
        next();
      })}>
      {type === 'Demographics' && (
        <>
          <p>
            Demographic information is collected in order to better understand
            how providers reflect the populations that they serve. Some parents
            may wish to seek providers with similar identities as their own.
            Demographic information will not be displayed on your public-facing
            profile unless you check the box choosing to share it. De-identified
            data (e.g. "of the Lactation Support Providers listed on this
            directory, x identify as Indigenous American, Asian American, Black,
            etc.) may be shared with other organizations seeking to improve
            conditions for pregnant and postpartum families.
            <br />
            <br />
            In choosing our demographic categories and approach to data
            collection, we incorporated feedback from local parents and
            providers, and epidemiologists at the Virginia Department of Health.
            We also reviewed the{' '}
            <a href="https://aanhpihealth.org/resource/asian-american-manual-2023/">
              Manual on Collection, Analysis, and Reporting Of Asian American
              Health Data (2023)
            </a>{' '}
            and other sources focused on more inclusive data collection
            practices. If we are missing something or you have suggestions for
            ways to improve our data collection, please
          </p>
        </>
      )}
      {formFields[type].map((input) => {
        const needsConsent = type === "Demographics";
        input.props = { ...input.props, register, errors, setValue, getValues, needsConsent };
        return (
          <>
            {(input.name === 'Profile photo') ? (
            <FormItem>
              <p>{profilePhotoMessage}</p>
            </FormItem>
            ) : ''}
            <FormItem input={input} key={input.props.dbName} />
          </>
        );
      })}
      <ButtonGroup isConfirmation={false} />
    </form>
  );
};
