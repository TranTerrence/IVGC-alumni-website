export interface User {
  uid: string,
  role?: string,
  email?: string,
  creationDate?: Date,
  lastConnection?: Date,
  verified?: boolean,
}