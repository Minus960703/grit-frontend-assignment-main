import React from 'react'
import styles from './UserForm.module.scss';
import { TextField } from 'components';

function UserForm() {
  return (
    <div className={styles.user__form}>
      <div className={styles.user__name}>
        <div className={styles.user__element}>
          <label htmlFor='firstName'>성</label>
          <TextField name='firstName' value='' type="text" placeholder='성을 입력해주세요.' onChangeEvent={() => { }} id="firstName" />
        </div>
        <div className={styles.user__element}>
          <label htmlFor='lastName'>이름</label>
          <TextField name='lastName' value='' type="text" placeholder='이름을 입력해주세요.' onChangeEvent={() => {}} id="lastName"/>
        </div>
      </div>
      <div className={styles.user__element}>
        <label htmlFor='lastName'>역할</label>
        select
        <TextField name='lastName' value='' type="text" placeholder='이름을 입력해주세요.' onChangeEvent={() => {}} id="lastName"/>
      </div>
      <div className={styles.user__element}>
        <label htmlFor='lastName'>이메일</label>
        <TextField name='lastName' value='' type="text" placeholder='이름을 입력해주세요.' onChangeEvent={() => {}} id="lastName"/>
      </div>
      <div className={styles.user__element}>
        <label htmlFor='lastName'>전화번호</label>
        <TextField name='lastName' value='' type="text" placeholder='이름을 입력해주세요.' onChangeEvent={() => {}} id="lastName"/>
      </div>
    </div>
  )
}

export { UserForm };