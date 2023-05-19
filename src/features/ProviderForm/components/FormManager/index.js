import { useState } from 'react';
import Confirmation from '../../layouts/Confirmation';
import FormSubmissionResults from '../../layouts/FormSubmissionResults';
import ProviderForm from '../NewProviderForm/NewProviderForm';

export default function FormManager() {
  const [pageState, setPageState] = useState(0);
  const [Element, setElement] = useState(<></>);
  const [provider, setProvider] = useState();

  const updateState = (pageState, provider) {
    setPageState(pageState)
    setProvider(provider)
  }

  useEffect(() => {
    switch (pageState) {
      case 0:
        setElement(ProviderForm);
        break;
      case 1:
        setElement(Confirmation);
        break;
      case 2:
        setElement(FormSubmissionResults);
        break;
    }
  }, [pageState]);

  return <Element {...updateState} {...provider} />;
}
