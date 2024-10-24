'use client';

import { Chip, VisuallyHidden, tv, useCheckbox } from '@nextui-org/react';
import type { CheckboxProps } from '@nextui-org/react';
import { IconCheck, IconX } from '@tabler/icons-react';

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
        startContent={isSelected ? <IconCheck className='ml-1' size={16} /> : <IconX className='ml-1' size={16} />}
        variant='faded'
        {...(getLabelProps() as any)}>
        {children ? children : props.label}
      </Chip>
    </label>
  );
};

export default CheckboxGenre;
