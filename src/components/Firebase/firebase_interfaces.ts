export interface User {
  uid: string,
  email: string,
  creationDate: firebase.firestore.Timestamp,
  role: string,
  verified: boolean,
}
export interface Profile {
  uid: string, //Same uid as the user
  email?: string,
  firstName?: string,
  lastName?: string,
  lastEditDate?: Date,
  onBoarding: number,
}
// Role Management in Firebase
//https://firebase.google.com/docs/firestore/solutions/role-based-access