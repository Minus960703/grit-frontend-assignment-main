import React, { useState } from 'react'
import { Select } from '@/components'
import styles from './Header.module.scss'
import { useNavigate } from 'react-router-dom'

function Header({ searchParam, isChangeSearchParamSelectActive, isChangeSelectBoxItems }) {
  const navigate = useNavigate();
  const moveToPrevPage = () => {
    navigate('/');
  }
  return (
    <header className={styles.header}>
      <div
        className={styles.back__btn}
        onClick={() => moveToPrevPage()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Select 
        selectActive={searchParam.active}
        selectOption={searchParam.role}
        isChangeSelectActive={isChangeSearchParamSelectActive}
        isChangeSelectBoxItems={isChangeSelectBoxItems}
        filter={true}
      />
    </header>
  )
}

export { Header };