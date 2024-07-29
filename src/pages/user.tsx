import React, { useCallback, useEffect, useState } from 'react'
import { getUserList, updateUserInfo } from '@/api/userAPI'
import { Grid, Pagination, UserForm, Header } from '@/components';
import { CellClickedEvent } from 'ag-grid-community';

const initialValue = {
  id: '',
  firstName: '',
  lastName: '',
  role: 'ADMIN',
  email: '',
  telephone: ''
};

function UserPage() {
  const [columnDefs] = useState([
    { field: 'name'     , headerName: '이름'    , headerClass: 'header-center'  , resizable: false  , cellStyle: {'textAlign' : 'left'}, width: 150},
    { field: 'role'     , headerName: '역할'    , headerClass: 'header-center'  , resizable: false  , width: 150 },
    { field: 'email'    , headerName: '이메일'  , headerClass: 'header-center'  , resizable: false  , cellStyle: {'textAlign' : 'left'}, width: 250 },
    { field: 'telephone', headerName: '전화번호' , headerClass: 'header-center'  , resizable: false  , width: 250 }
  ]);

  const [searchParam, setSearchParam] = useState({
    page: Number(sessionStorage.getItem('page')) || 1,
    role: sessionStorage.getItem('role') || '',
    active: false,
  });

  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const limit = 5;

  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({ ...initialValue });
  const [selectActive, setSelectActive] = useState(false);
  const [updateFormCheck, setUpdateFormCheck] = useState(false);

  const loadUserList = () => {
    getUserList(searchParam)
      .then((response) => {
        const rowDataArray = response.users?.map((user) => {
          return { ...user, name: `${user.firstName} ${user.lastName}` }
        });

        setUserList(rowDataArray);
        setTotalEvents(response.total);
        setTotalPages(Math.ceil(response.total / limit));
      });
  }

  useEffect(() => {
    loadUserList();
  }, [searchParam.page, searchParam.role]);

  const handleCellClicked = (params: CellClickedEvent) => {
    const field = params.data;
    if (updateFormCheck) {
      const userConfirmed = window.confirm('수정중인 내용이 있습니다.\n지금 변경하시면 저장되지 않습니다.\n변경 하시겠습니까?');
      if (userConfirmed) {
        setUpdateFormCheck(false);
        setUserInfo({ ...field });
      }
    } else setUserInfo({ ...field });
  };

  const onChangeUserInfo = (name: string, value: string) => {
    if (!updateFormCheck) {
      setUpdateFormCheck(true);
    }
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    })
  }

  const isChangeSelectActive = () => setSelectActive((prev) => !prev);

  const isChangeSelectBoxItems = (name: string, value: string) => {
    if (selectActive) {
      onChangeUserInfo(name, value);
    }
    isChangeSelectActive();
  };

  const onChangeSearchParam = (name: string, value: string | number) => {
    setSearchParam((prev) => {
      return { ...prev, [name]: value }
    });
  }

  const isChangeCurrentPage = (value: number) => {
    onChangeSearchParam('page', value);
    sessionStorage.setItem('page', String(value));
  };

  const isChangeSearchParamRole = (name: string, value: string) => {
    if (searchParam.active) {
      sessionStorage.setItem('role', value);
      isChangeCurrentPage(1);
      onChangeSearchParam('role', value);
    }
    isChangeSearchParamSelectActive();
  };
  
  const isChangeSearchParamSelectActive = () => setSearchParam((prev) => { return { ...prev, active: !prev.active } });
  
  const onClickedSaveButton = () => {
    updateUserInfo(userInfo)
      .then((response) => loadUserList())
      .catch((reject) => console.warn(reject));
  }

  return (
    <div>
      <Header
        searchParam={searchParam}
        isChangeSelectActive={isChangeSearchParamSelectActive}
        isChangeSelectBoxItems={isChangeSearchParamRole}
        updateFormCheck={updateFormCheck}
      />
      <Grid
        rowData       = {userList}
        columnDefs    = {columnDefs}
        onCellClicked = {handleCellClicked}
      />
      {userList.length
          && <Pagination
              limit={limit}
              setPage={()=>{}}
              page={searchParam.page}
              setPage={isChangeCurrentPage}
              totalEvents={totalEvents}
              totalPages={totalPages}
            />
      }
      <UserForm
        userInfo          = {userInfo}
        onChangeUserInfo  = {onChangeUserInfo}
        selectActive={selectActive}
        isChangeSelectActive={isChangeSelectActive}
        isChangeSelectBoxItems={isChangeSelectBoxItems}
        onClickedSaveButton={onClickedSaveButton}
      />
    </div>
  )
}

export default UserPage