import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError()
  const message = error?.data?.error || error?.message || 'There was an error';
  return (
    <>
      <p>{message}</p>
    </>
  );
}

const errorContent = { Content: Error, title: "There's been an Error!" };
export default errorContent;
