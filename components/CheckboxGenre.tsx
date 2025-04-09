'use client';

import { Chip, VisuallyHidden, tv, useCheckbox } from '@heroui/react';
import type { CheckboxProps } from '@heroui/react';
import { Check, X } from '@/assets/icons';

interface CheckboxGenreProps extends CheckboxProps {
  label: string;
}

const CheckboxGenre: React.FC<CheckboxGenreProps> = (props) => {
  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const checkbox = tv({
    slots: {
      base: 'border-default hover:bg-default-200',
      content: 'text-sm',
    },
    variants: {
      isSelected: {
        true: {
          base: `border-primary bg-${props.color} hover:bg-primary-500 hover:border-primary-500`,
          content: `text-primary-foreground pl-1`,
        },
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-focus ring-offset-2 ring-offset-background',
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        startContent={isSelected ? <Check className='ml-1 size-4' /> : <X className='ml-1 size-4' />}
        variant='faded'
        {...(getLabelProps() as any)}>
        {children ? children : props.label}
      </Chip>
    </label>
  );
};

export default CheckboxGenre;
