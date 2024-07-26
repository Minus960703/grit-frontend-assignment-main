import React from 'react'
import styles from './UserForm.module.scss';
import { TextField } from 'components';

function UserForm() {
  return (
    <div className={styles.user__form}>
      <TextField name='firstName' value='' type="text" placeholder='성을 입력해주세요.' onChangeEvent={() => {}}/>
    </div>
  )
}

export { UserForm };