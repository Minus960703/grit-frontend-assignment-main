import React from 'react'
import styles from './Select.module.scss';
import { IconImage } from '@/components';

const SelectArray = [
	{
		id: 1,
		name: 'ADMIN',
		value: 'ADMIN'
	},
	{
		id: 2,
		name: 'USER',
		value: 'USER'
	},
	{
		id: 3,
		name: 'GUEST',
		value: 'GUEST'
	}
]

function Select({ selectOption, selectActive, isChangeSelectActive, isChangeSelectBoxItems, filter = false }: Props) {
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