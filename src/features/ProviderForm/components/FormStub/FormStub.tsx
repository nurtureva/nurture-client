import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../FormItem';
import { PageStateTitle } from '@/types';
import { ButtonGroup } from '../FormPageSwitcher/ButtonGroup';
import { useForm } from 'react-hook-form';
import { useDefaultValues } from '../../utils/helpers';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formData: { newProvider },
    formState: {
      formType: { formFields },
      updateState,
      next
    }
  } = useFormContext();

  const { register, handleSubmit } = useForm({
    defaultValues: newProvider
  });
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        updateState({ newProvider: data });
        next();
      })}>
      {type === 'Demographics' && (
        <>
          <p>
            Why are we collecting demographic data?
            <br />
            "Demographic information is collected in order to better understand
            the local perinatal health ecosystem and how providers reflect the
            populations that they serve. Some parents may wish to seek providers
            with similar identities as their own. Demographic information will
            not be displayed on your public-facing profile unless you check the
            box choosing to share it. De-identified data (e.g. "of the Lactation
            Support Providers listed on this directory, x identify as Indigenous
            American, Asian American, Black, etc.) may be shared with other
            organizations seeking to improve conditions for pregnant and
            postpartum families.{' '}
          </p>

          <p>
            In choosing our demographic categories and approach to data
            collection, we reviewed the Manual on Collection, Analysis, and
            Reporting Of Asian American Health Data (2023) and other sources
            focused on more inclusive data collection practices. We also
            incorporated feedback from local parents and providers, and
            epidemiologists at the Virginia Department of Health. If we are
            missing something or you have suggestions for ways to improve our
            data collection, please reach out.
          </p>
        </>
      )}
      {formFields[type].map((input) => {
        input.props.register = register;
        return <FormItem input={input} key={input.props.dbName} />;
      })}
      <ButtonGroup isConfirmation={false} />
    </form>
  );
};
