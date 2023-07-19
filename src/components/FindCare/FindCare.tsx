import { Option } from '@/types';

export const FindCare = (paymentOptions: Option[]) => {
  return (
    <>
      <h2>More ways to find care</h2>
      <div>
        <h3>Search by payment accepted</h3>
        {paymentOptions.map((option) => {
          return <button>{option.name}</button>;
        })}
      </div>
    </>
  );
};
