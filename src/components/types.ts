import { InputHTMLAttributes } from 'react';
import { RefCallBack } from 'react-hook-form';

export type Icon =
  | 'arrow_back'
  | 'arrow_downward'
  | 'arrow_drop_down'
  | 'arrow_drop_up'
  | 'arrow_forward'
  | 'arrow_left'
  | 'arrow_right'
  | 'arrow_upward'
  | 'bookmark_border'
  | 'bookmark_filled'
  | 'call'
  | 'carrot_back'
  | 'carrot_down'
  | 'carrot_forward'
  | 'carrot_up'
  | 'check'
  | 'check_box_checked'
  | 'check_box_unchecked'
  | 'clear'
  | 'edit'
  | 'email'
  | 'error'
  | 'error_outline'
  | 'file_download'
  | 'file_upload'
  | 'map'
  | 'menu'
  | 'open_in_new'
  | 'print'
  | 'radio_button_checked'
  | 'radio_button_unchecked'
  | 'search'
  | 'web';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: Icon;
  innerRef?: RefCallBack;
}

export type ButtonProps = React.HTMLProps<HTMLButtonElement> &
  React.PropsWithChildren<{
    type?: 'primary' | 'secondary' | 'tertiary';
    isSubmit?: boolean;
    size?: 'small';
    to?: string;
    icon?: Icon;
    state?: Object;
  }>;
