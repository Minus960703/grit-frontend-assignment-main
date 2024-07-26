import React, { useEffect, useState } from 'react'
import { getUserList } from '@/api/userAPI'
import { Grid, Pagination, UserForm } from '@/components';

function UserPage() {
  const [page, setPage] = useState<number>(1);

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

  useEffect(() => {
    getUserList(page)
      .then((response) => {
        const rowDataArray = response.users?.map((user) => {
          return { ...user, name: `${user.firstName} ${user.lastName}`}
        });

        setUserList(rowDataArray);
        setTotalEvents(response.total);
        setTotalPages(Math.ceil(response.total / limit));
      })
  }, []);

  return (
    <div>
      <Grid
        rowData     = {userList}
        columnDefs  = {columnDefs}
      />
      {userList.length
          && <Pagination
              limit={limit}
              setPage={()=>{}}
              page={page}
              totalEvents={totalEvents}
              totalPages={totalPages}
            />
      }
      <UserForm />
    </div>
  )
}

export default UserPage