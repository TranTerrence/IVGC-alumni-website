import admin = require('firebase-admin');
import nodemailer = require("nodemailer");

admin.initializeApp();
const func = require('firebase-functions');
const functions = func.region("europe-west3");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateClaim = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change: {
    after: { data: () => any; },
    before: { data: () => any; },
  },
    context: { params: { userId: string; }; }) => {

    const newValue = change.after.data();
    const customClaims = {
      role: newValue.role,
      verified: newValue.verified,
    };

    if (change.before.data().verifed !== change.after.data()) {
      await sendConfirmationEmail(newValue.email);
    }

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

export const sendConfirmationEmail = async (email: string) => {
  const actionCodeSettings: admin.auth.ActionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:3000/signin', // The url has to be from the same domain it is called
  };
  // Admin SDK API to generate the email verification link.
  const verifyLink = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings)
    .catch((error) => {
      // Some error occurred.
      console.log("error getting verify link", error);
    });


  const config = func.config(); // Retrive the environment config from firebase/  CLI: firebase functions:config:get
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.ivgcemail.email,
      pass: config.ivgcemail.pass
    }
  });

  const mailOptions = {
    from: "ne-pas-répondre <" + config.ivgcemail.email + ">",
    to: email,
    subject: "Bienvenue dans la communauté alumni de l'Institut Villebon Georges Charpak",
    html: `<p style="font-size: 16px;"> Bonne nouvelle ton compte a été vérifié, il faut maintenant que tu vérifies ton email en cliquant <a href="${verifyLink}">sur ce lien</a>
    </p>`,

  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error.toString());
    }
    const data_str = JSON.stringify(data)
    console.log(`Sent! ${data_str}`);
  });
}