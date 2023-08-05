import { Icon } from '@/components';

export const PageStateIndicator = ({
  id,
  state
}: {
  id: number;
  state: string;
}) => {
  return <span>{state === 'complete' ? <Icon type="check" /> : id}</span>;
};
