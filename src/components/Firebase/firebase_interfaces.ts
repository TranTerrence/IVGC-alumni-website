export interface User {
  uid: string,
  role?: string,
  email?: string,
  creationDate?: Date,
  lastConnection?: Date,
  verified?: boolean,
}
export interface Profile {
  uid: string, //Same uid as the user
  firstName?: string,
  lastName?: string,
  lastEditDate?: Date,
}
// Role Management in Firebase
//https://firebase.google.com/docs/firestore/solutions/role-based-access