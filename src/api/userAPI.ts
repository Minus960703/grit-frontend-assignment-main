import axios from 'axios';

export enum UserRole {
  'ADMIN',
  'USER',
  'GUEST'
}

interface UserListProps {
  page    : number;
  perPage : number;
  role    : UserRole;
} //role: 'ADMIN' | 'USER' | 'GUEST'; 도 가능하지만, 확장성을 고려해서 enum 으로 따로 관리

export interface UserInfoProps {
  firstName : string;
  lastName  : string;
  role      : UserRole;
  email     : string;
  telephone : string;
}

const getUserList = async(page: UserListProps['page'] = 1) => {
  try {
    const response = await axios.get(`/api/users?page=${page}`);

    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { getUserList };