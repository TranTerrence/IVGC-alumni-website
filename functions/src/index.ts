import admin = require('firebase-admin');
admin.initializeApp();
const functions = require('firebase-functions').region("europe-west3");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateClaim = functions.firestore
  .document('users/{userId}')
  .onUpdate((change: { after: { data: () => any; }; },
    context: { params: { userId: string; }; }) => {

    const newValue = change.after.data();
    const customClaims = {
      role: newValue.role,
      verified: newValue.verified,
    };

    // Set custom user claims on this update.
    return admin.auth().setCustomUserClaims(
      context.params.userId, customClaims)
      .then(() => {
        console.log("Custom Claim updated for " + context.params.userId);
      })
      .catch((error: any) => {
        console.log(error);
      });

  });