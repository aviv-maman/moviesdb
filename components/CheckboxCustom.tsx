'use client';

import { type FC } from 'react';
import { Checkbox, Avatar, cn, Tooltip } from '@nextui-org/react';
import { useForm } from '@/context/FormContext';

interface CheckboxCustomProps {
  avatar?: string;
  id: number;
  value: string;
}

const CheckboxCustom: FC<CheckboxCustomProps> = ({ avatar, id, value }) => {
  const { dispatch, state } = useForm();

  return (
    <Tooltip
      content={value}
      showArrow
      classNames={{
        base: 'py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50',
        arrow: 'bg-default-200',
      }}>
      <div>
        <Checkbox
          aria-label={value}
          classNames={{
            base: cn(
              'inline-flex w-full bg-content1 m-0',
              'hover:bg-content2 items-center justify-start',
              'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
              'data-[selected=true]:border-primary'
            ),
            label: 'w-full',
          }}
          onChange={(e) => dispatch({ type: 'toggled_provider', payload: { provider_id: id } })}
          value={value}>
          <Avatar size='md' src={avatar} name={value} />
        </Checkbox>
      </div>
    </Tooltip>
  );
};

export default CheckboxCustom;
