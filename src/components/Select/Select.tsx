import React from 'react'
import styles from './Select.module.scss';
import { IconImage } from '@/components';
import { UserRole } from '@/api/userAPI';

interface SelectProps {
	selectOption: '' | UserRole;
	selectActive: boolean;
	isChangeSelectActive: () => void;
	isChangeSelectBoxItems: (name: string, value: '' | UserRole) => void;
	filter?: boolean;
}

interface SelectArrayProps {
	id: number;
	name: string;
	value: UserRole;
}


const SelectArray: SelectArrayProps[] = [
  {
    id: 1,
    name: 'ADMIN',
    value: UserRole.ADMIN
  },
  {
    id: 2,
    name: 'USER',
    value: UserRole.USER
  },
  {
    id: 3,
    name: 'GUEST',
    value: UserRole.GUEST
  }
];

function Select({ selectOption, selectActive, isChangeSelectActive, isChangeSelectBoxItems, filter = false }: SelectProps) {
  return (
    <ul
      className={
        `${styles.select} ${selectActive ? styles['select--active'] : undefined}`
      }
      onClick={isChangeSelectActive}
    >
      <p>{selectOption || '전체'}</p>
			<div
				className={`${styles.select__option} ${selectActive ? styles['select__option--active'] : undefined}`}
				onClick={(e) => e.stopPropagation()}
			>
				{filter && <p onClick={() => isChangeSelectBoxItems('role', '')}>전체</p>}
				{SelectArray?.map((selectItem) => (
					<p
						key={selectItem.id}
						onClick={() => isChangeSelectBoxItems('role', selectItem.value)}
					>
						{selectItem.name}
					</p>
				))}
			</div>
			<button className={styles.btn__arrow}>
				{!selectActive && <IconImage icon='ARROWDOWN' />}
			</button>
    </ul>
  )
}

export { Select };