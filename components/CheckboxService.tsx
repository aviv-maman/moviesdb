'use client';

import { Avatar, Tooltip } from '@nextui-org/react';
import type { CheckboxProps } from '@nextui-org/react';
import { Chip, VisuallyHidden, tv, useCheckbox } from '@nextui-org/react';

interface CheckboxServiceProps extends CheckboxProps {
  avatar?: string;
  provider_name: string;
}

const checkbox = tv({
  slots: {
    base: 'border-default hover:bg-default-200 h-11 w-11 rounded-lg flex items-center justify-center px-0',
    content: 'text-default-500 px-0',
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

const CheckboxService: React.FC<CheckboxServiceProps> = (props) => {
  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <Tooltip
      content={props.provider_name}
      showArrow
      placement='bottom'
      classNames={{
        content:
          'py-1 px-2 border border-default-300 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
        arrow: 'bg-default-200',
      }}>
      <label {...getBaseProps()}>
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
          {...(getLabelProps() as any)}>
          {children ? children : <Avatar radius='sm' size='md' src={props.avatar} name={props.value} />}
        </Chip>
      </label>
    </Tooltip>
  );
};

export default CheckboxService;
