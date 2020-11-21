export interface User {
  uid: string,
  email: string,
  creationDate: firebase.firestore.Timestamp,
  role: string,
  verified: boolean,
}
export interface Profile {
  uid: string, //Same uid as the user
  firstName?: string,
  lastName?: string,
  lastEditDate?: Date,
}
// Role Management in Firebase
//https://firebase.google.com/docs/firestore/solutions/role-based-access