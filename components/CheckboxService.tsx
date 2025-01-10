'use client';

import { Avatar, Checkbox, type CheckboxProps, Tooltip, cn, useCheckbox } from '@nextui-org/react';

interface CheckboxServiceProps extends CheckboxProps {
  avatar?: string;
  provider_name: string;
}

const CheckboxService: React.FC<CheckboxServiceProps> = (props) => {
  const { isSelected } = useCheckbox({ ...props });

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
      <Checkbox value={props.value} classNames={{ wrapper: 'hidden' }}>
        <Avatar
          radius='sm'
          size='md'
          src={props.avatar}
          name={props.value}
          classNames={{
            base: cn(`border border-default`, {
              'border-primary hover:border-primary-500': isSelected,
            }),
          }}
        />
      </Checkbox>
    </Tooltip>
  );
};

export default CheckboxService;
