import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { collections } from '../../constants/firebase';
import { User } from './firebase_interfaces';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

/**
 * Handle all the interactions with Firebase, our backend.
 * Extracted from this tutorial: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
 * by BY ROBIN WIERUCH
 */
class Firebase {

  auth: app.auth.Auth;
  firestore: firebase.firestore.Firestore;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
  }



  // *** Auth API ***
  doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    const userCred = await this.auth.createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          return ('The password is too weak.');
        } else {
          return errorMessage;
        }
      });
    const user = await userCred.user;
    this.addUserInFirestore(user);
  }

  doSignInWithEmailAndPassword = async (email: string, password: string) => {
    const userCred = await this.auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    if (userCred && userCred.user) {
      const user = await userCred.user;
      this.logUser(user.uid);
    }

  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password); // Executed only if currentUser exist thanks to the ?. operator otherwise return undefined


  // *** Firestore API ***
  addUserInFirestore = (user: User) =>
    this.firestore.collection(collections.users).doc(user.uid)
      .set({
        uid: user.uid,
        email: user.email,
        creationDate: new Date(),
        lastConnection: new Date(),
      })
      .then(function () {
        console.log("New user created successfully in Firestore");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  /**
   * Update only the fields that the user argument has
   * @param user 
   */
  updateUser = (user: User) => {
    this.firestore.collection(collections.users).doc(user.uid)
      .update(user)
      .then(function () {
        console.log("User updated successfully");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  logUser = (uid: string) =>
    this.updateUser({
      uid: uid,
      lastConnection: new Date(),
    });


}
export default Firebase;