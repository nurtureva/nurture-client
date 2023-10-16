import { Button } from '.';

type ButtonGroupProps = {
  converse?: boolean; //flex row reverse
  buttonProps: ButtonPropArray;
};
type ButtonProps = {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  to?: string;
};
export type ButtonPropArray = [ButtonProps, ButtonProps];

export const ButtonGroup = ({ converse, buttonProps }: ButtonGroupProps) => {
  return (
    <span
      style={
        converse
          ? { flexDirection: 'row-reverse', justifyContent: 'flex-end' }
          : {}
      }
      className={`button-group-container`}>
      <Button {...buttonProps[0]} type="primary"></Button>
      <Button {...buttonProps[1]} type="secondary"></Button>
    </span>
  );
};

<ButtonGroup
  converse
  buttonProps={[
    {
      children: 'test',
      onClick: (e) => {
        console.log(e);
      }
    },
    {
      children: 'test2',
      onClick: () => {
        console.log('test2');
      }
    }
  ]}
/>;
