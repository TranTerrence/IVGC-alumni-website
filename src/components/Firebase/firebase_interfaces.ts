export interface User {
  uid: string,
  email?: string,
  creationDate?: Date,
  lastConnection?: Date,
  verifiedByAdmin?: Boolean,
}