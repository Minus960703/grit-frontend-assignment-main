import { Select } from '@/components'
import styles from './Header.module.scss'
import { useNavigate } from 'react-router-dom'
import { SearchParamProps } from '@/pages/user'
import { UserRole } from '@/api/userAPI';

interface HeaderProps{
  searchParam: SearchParamProps;
  isChangeSelectActive: () => void;
  isChangeSelectBoxItems: (name: string, value: '' | UserRole) => void;
  updateFormCheck: boolean;
}

function Header({
  searchParam,
  isChangeSelectActive,
  isChangeSelectBoxItems,
  updateFormCheck
}: HeaderProps) {
  const navigate = useNavigate();
  const moveToPrevPage = () => {
    if (updateFormCheck) {
      const userConfirmed = window.confirm('수정중인 내용이 있습니다.\n 지금 뒤로가시면 저장되지 않습니다.\n 뒤로 가시겠습니까?');
      if (userConfirmed) {
        navigate('/');
      }
    } else navigate('/');
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
        isChangeSelectActive={isChangeSelectActive}
        isChangeSelectBoxItems={isChangeSelectBoxItems}
        filter={true}
      />
    </header>
  )
}

export { Header };