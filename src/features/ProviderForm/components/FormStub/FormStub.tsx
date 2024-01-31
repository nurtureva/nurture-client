import { useFormContext } from '../../utils/formContext';
import { FormItem } from '../FormItem';
import { PageStateTitle } from '@/types';

export const FormStub = ({ type }: { type: PageStateTitle }) => {
  const {
    formState: {
      formType: { formFields }
    }
  } = useFormContext();
  return (
    <>
      {type === 'Demographics' ? (
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
      ) : (
        ''
      )}
      {formFields.map((input, i) => {
        if (input.stubName === type) return <FormItem input={input} key={i} />;
      })}
    </>
  );
};
