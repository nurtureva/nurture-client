import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError() as {
    data: { error: string };
  };
  const message = error?.data?.error || 'There was an error';
  return (
    <>
      <p>{message}</p>
    </>
  );
}

const errorContent = { Content: Error, title: "There's been an Error!" };
export default errorContent;
