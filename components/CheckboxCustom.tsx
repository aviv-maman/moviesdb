'use client';

import { type FC } from 'react';
import { Avatar, Tooltip } from '@nextui-org/react';
import { useCheckbox, Chip, VisuallyHidden, tv, CheckboxProps } from '@nextui-org/react';
import { useForm } from '@/context/FormContext';
interface CheckboxCustomProps extends CheckboxProps {
  avatar?: string;
  provider_id: number;
  value: string;
}

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200 h-12 w-12 rounded-lg flex items-center justify-center',
    content: 'text-default-500',
  },
  variants: {
    isSelected: {
      true: {
        base: 'border-primary bg-primary hover:bg-primary-500 hover:border-primary-500',
        content: 'text-primary-foreground',
      },
    },
    isFocusVisible: {
      true: {
        base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
      },
    },
  },
});

const CheckboxCustom: FC<CheckboxCustomProps> = (props) => {
  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  const { dispatch } = useForm();

  return (
    <Tooltip
      content={props.value}
      showArrow
      classNames={{
        base: 'py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
        arrow: 'bg-default-200',
      }}>
      <label {...getBaseProps()} title='image-hover'>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <Chip
          classNames={{
            base: styles.base(),
            content: styles.content(),
          }}
          color='primary'
          variant='faded'
          onClick={(e) => dispatch({ type: 'toggled_provider', payload: { provider_id: props.provider_id } })}
          {...getLabelProps()}>
          {children ? children : <Avatar radius='sm' size='md' src={props.avatar} name={props.value} />}
        </Chip>
      </label>
    </Tooltip>
  );
};

export default CheckboxCustom;
