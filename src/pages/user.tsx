import React, { useCallback, useEffect, useState } from 'react'
import { getUserList, updateUserInfo } from '@/api/userAPI'
import { Grid, Pagination, UserForm } from '@/components';
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
  const [searchParam, setSearchParam] = useState({
    page: 1,
  });

  const [selectActive, setSelectActive] = useState(false);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const limit = 5;
  const [userList, setUserList] = useState([]);
  const [columnDefs] = useState([
    { field: 'name'     , headerName: '이름'    , headerClass: 'header-center'  , resizable: false  , cellStyle: {'textAlign' : 'left'}, width: 150},
    { field: 'role'     , headerName: '역할'    , headerClass: 'header-center'  , resizable: false  , width: 150 },
    { field: 'email'    , headerName: '이메일'  , headerClass: 'header-center'  , resizable: false  , cellStyle: {'textAlign' : 'left'}, width: 250 },
    { field: 'telephone', headerName: '전화번호' , headerClass: 'header-center'  , resizable: false  , width: 250 }
  ]);

  const isChangeCurrentPage = useCallback((value: number) => {
    setSearchParam((prev) => {
			return { ...prev, page: value };
		});
  }, []);

  const [userInfo, setUserInfo] = useState({ ...initialValue })
  
  const onChangeUserInfo = (name: string, value: string) => {
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    })
  }

  const loadUserList = () => {
    getUserList(searchParam.page)
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
  }, [searchParam.page]);

  const handleCellClicked = (params: CellClickedEvent) => {
    const field = params.data;
    setUserInfo({ ...field });
  };

  const isChangeSelectActive = () => setSelectActive((prev) => !prev);

  const isChangeSelectBoxItems = (name, value) => {
    onChangeUserInfo(name, value);
    isChangeSelectActive();
  };
  
  const onClickedSaveButton = () => {
    updateUserInfo(userInfo)
      .then((response) => loadUserList())
      .catch((reject) => console.warn(reject));
  }

  return (
    <div>
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