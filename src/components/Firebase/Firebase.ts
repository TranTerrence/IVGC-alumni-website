import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import { collections, fieldList } from '../../constants/firebase';
import { roles } from '../../constants/roles';
import { initProfile, Profile } from '../Profile/ProfileContext';
import { User } from '../User/UserContext';
import { School } from './SchoolsContext';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

/**
 * Handle all the interactions with Firebase, our backend.
 * Extracted from this tutorial: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial
 * by BY ROBIN WIERUCH
 */
class Firebase {

  auth: app.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  analytics: firebase.analytics.Analytics;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.analytics = app.analytics();
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
    // Create the Profile with default values
    this.updateProfile({
      ...initProfile,
      basics: {
        uid: user.uid,
        email: user.email,
      }

    })
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
      const user = userCred.user;
      return user;
    }

  }

  doSignOut = () => {
    this.auth.signOut();
    console.log("User Signout");

  }

  doPasswordReset = (email: string) => {
    let actionCodeSettings = {
      url: 'https://alumni-ivgc.web.app/signin',
    }; // will redirect to the signin page after resetting the password
    return this.auth.sendPasswordResetEmail(email, actionCodeSettings);
  }

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser?.updatePassword(password); // Executed only if currentUser exist thanks to the ?. operator otherwise return undefined

  isLoggedIn = (): boolean => {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in.
      return true
    } else {
      return false
    }
  }

  isAdmin = async (): Promise<boolean> => {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in.
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult.claims.role === roles.admin;
    } else {
      return false
    }
  }

  // *** Firestore API ***
  addUserInFirestore = (user: User) => {
    const userData: User = {
      uid: user.uid,
      role: roles.student,  // By default all new account is a student
      email: user.email,
      creationDate: app.firestore.Timestamp.now(),
      verified: false,
    };
    this.firestore.collection(collections.users).doc(user.uid)
      .set(userData)
      .then(function () {
        console.log("New user created successfully in Firestore");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  addSchool = (school: School) => {

    this.firestore.collection(collections.schools).add(school)
      .then(function () {
        console.log("New school created successfully in Firestore");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }



  isVerified = async (): Promise<boolean> => {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in.
      const idTokenResult = await user.getIdTokenResult();
      return idTokenResult.claims.verified === true;
    } else {
      return false
    }
  }

  /**
   * Update only the fields that the user argument has
   * note that the UID field is required
   * @param user 
   */
  updateUser = (user: Partial<User>) => {
    this.firestore.collection(collections.users).doc(user.uid)
      .update(user)
      .then(function () {
        console.log("User updated successfully");
      })
      .catch(function (error) {
        console.error("Error writing document, make sure to provide the uid of the user.", error);
      });
  }

  updateProfile = (profile: Partial<Profile>) => {
    if (profile.basics) {
      this.firestore.collection(collections.profiles).doc(profile.basics.uid)
        .set(profile, { merge: true })
        .then(function () {
          console.log("User updated successfully");
        })
        .catch(function (error) {
          console.error("Error writing document, make sure to provide the uid of the profile.", error);
        });
    }
    else
      console.error("Error writing document, make sure to provide the uid of the profile.");
  }

  getCurrentProfile = async (): Promise<Profile | null> => {
    const user = this.auth.currentUser;
    if (user) {
      // User is signed in.
      const doc = await this.firestore.collection(collections.profiles).doc(user.uid).get();
      if (!doc.exists) {
        console.log('User ', user.uid, " has no profile.");
        return null;
      } else {
        return (doc.data() as Profile);
      }
    } else {
      return null;
    }
  }

  verifyUser = (uid: string) => {
    if (this.isAdmin()) {
      this.updateUser({
        uid: uid,
        verified: true
      });
    }
  }

  changeRole = (uid: string, role: string) => {
    if (this.isAdmin()) {
      this.updateUser({
        uid: uid,
        role: role
      });
    }
  }

  toTimestamp = (date: Date): app.firestore.Timestamp => {
    return app.firestore.Timestamp.fromDate(date);
  }

  // *** Storage API ***
  listResources = async (path: string): Promise<void | app.storage.ListResult> => {
    // Create a reference under which you want to list
    var resourceRef = this.storage.ref().child(path);

    let res = await resourceRef.listAll()
      .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("Can't get resources ref");
      });
    return res;
  }

  getDownloadURL = async (path: string) => {
    const url = await this.storage.ref().child(path).getDownloadURL();
    return url;
  }

  downloadDocument = (path: string, fileName: string) => {
    this.storage.ref().child(path).getDownloadURL().then(function (url: string) {
      let a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();

    }).catch(function (error: any) {
      // Handle any errors
    });
  }

  getMetadata = async (path: string): Promise<app.storage.FullMetadata | null> => {
    const metadata = await this.storage.ref().child(path).getMetadata();
    return metadata;
  }

  getConstant = async (constantType: string): Promise<any> => {
    // User is signed in.
    const doc = await this.firestore.collection(collections.constants).doc(constantType).get();
    if (!doc.exists) {
      console.log('Constant ', constantType, " does not exist.");
      return null;
    } else {
      return (doc.data());
    }
  }

  setConstant = () => {

    this.firestore.collection(collections.constants).doc("postFormation").set({ "fieldList": fieldList });

  }
}
export default Firebase;