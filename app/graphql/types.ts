export interface Query {
  getUser: User
  listUser: UserConnection
}

export interface User {
  id: string
  name: string
  dob: string
  address: string
  description: string
  createdAt: string
  updatedAt: string
};

export interface UserConnection {
  items: User[]
  nextToken: string
};

export interface ListUsers {
  listUser: UserConnection
};
