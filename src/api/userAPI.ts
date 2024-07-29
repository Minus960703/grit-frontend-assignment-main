import axios from 'axios';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

interface UserListProps {
  page    : number;
  perPage?: number;
  role    : '' | UserRole;
}

export interface UserInfoProps {
  id        : number;
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

const updateUserInfo = async ({id, firstName, lastName, email, role, telephone}: UserInfoProps) => {
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