import React from 'react'
import styles from './UserForm.module.scss';
import { Button, Select, TextField } from '@/components';

function UserForm({userInfo, onChangeUserInfo, selectActive, isChangeSelectActive, isChangeSelectBoxItems, onClickedSaveButton}) {
  return (
    <div className={styles.user__form}>
      <div className={styles.user__name}>
        <div className={styles.user__element}>
          <label htmlFor='firstName'>성</label>
          <TextField name='firstName' value={userInfo.firstName} type="text" placeholder='성을 입력해주세요.' onChangeEvent={onChangeUserInfo} id="firstName" />
        </div>
        <div className={styles.user__element}>
          <label htmlFor='lastName'>이름</label>
          <TextField name='lastName' value={userInfo.lastName} type="text" placeholder='이름을 입력해주세요.' onChangeEvent={onChangeUserInfo} id="lastName"/>
        </div>
      </div>
      <div className={styles.user__element}>
        <label htmlFor='email'>이메일</label>
        <TextField name='email' value={userInfo.email} type="text" placeholder='이름을 입력해주세요.' onChangeEvent={onChangeUserInfo} id="email"/>
      </div>
      <div className={styles.user__element}>
        <label htmlFor='telephone'>전화번호</label>
        <TextField name='telephone' value={userInfo.telephone} type="tel" placeholder='이름을 입력해주세요.' onChangeEvent={onChangeUserInfo} id="telephone" />
      </div>
      <div className={styles.user__element}>
        <label htmlFor='role'>역할</label>
        <Select
          selectOption={userInfo.role}
          selectActive={selectActive}
          isChangeSelectActive={isChangeSelectActive}
          isChangeSelectBoxItems={isChangeSelectBoxItems}
        />
      </div>
      <Button value={'저장'} onClickEvent={onClickedSaveButton}/>
    </div>
  )
}

export { UserForm };