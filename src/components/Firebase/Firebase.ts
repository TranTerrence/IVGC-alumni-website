import app, { database } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    db: database.Database;

    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = database();
    }
  
    // *** Auth API ***
  
    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
      this.auth.createUserWithEmailAndPassword(email, password);
  
    doSignInWithEmailAndPassword = (email: string, password: string) =>
      this.auth.signInWithEmailAndPassword(email, password);
  
    doSignOut = () => this.auth.signOut();
  
    doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);
  
    doPasswordUpdate = (password: string) =>
      this.auth.currentUser?.updatePassword(password); // Executed only if currentUser exist thanks to the ?. operator otherwise return undefined  
  
    createDummyArticle = () =>
      this.db.ref("articles/1").set({
        PostContent: "La formation s’appuie sur une pédagogie active basée sur l’expérimentation dans l’esprit du programme main à la pâte",
        PostTitle: "Titre de toto",
        author: "Thomas GEFFROY",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
        image: "https://images.pexels.com/photos/34600/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        title: "toto",
      })

      getDummyArticle = () =>{
       console.log(this.db.ref("articles/1").once("value"))
       return "Test";
    }
  
  }
export default Firebase;