import { Button } from '.';
import { ButtonProps } from '../types';

type ButtonGroupProps = {
  converse?: boolean; //flex row reverse
  buttonProps: ButtonPropArray;
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
/**
 * 
 * @example
 * <ButtonGroup
 * converse
 * buttonProps={[
 *   {
 *     children: 'test',
 *     onClick: (e) => {
 *       console.log(e);
 *     }
 *   },
 *   {
 *     children: 'test2',
 *     onClick: () => {
 *       console.log('test2');
 *     }
 *   }
 * ]}
 * />;
*/
