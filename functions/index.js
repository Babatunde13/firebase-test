const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./testproject2-73370-firebase-adminsdk-l6v36-92b28dc61b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.add_log = functions.firestore.document('/data/{dataId}').onCreate((snapshot, ctx) => {
    admin.firestore().collection('log').add({
        email: snapshot.data().user.email,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
})