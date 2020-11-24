export interface User {
  uid: string,
  email: string,
  creationDate: firebase.firestore.Timestamp,
  role: string,
  verified: boolean,
}
