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

const getUserList = async({page = 1, role}: UserListProps) => {
  try {
    const response = await axios.get(`/api/users?page=${page}${role && `&role=${role}`}`);

    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

const updateUserInfo = async ({id, firstName, lastName, email, role, telephone}) => {
  try {
    const response = await axios.patch(`/api/users/${id}`, {
      firstName,
      lastName,
      email,
      role,
      telephone
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

export { getUserList, updateUserInfo };