const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("testproject2-73370-firebase-adminsdk-l6v36-92b28dc61b.json");
const bcrypt = require("bcrypt")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


exports.register = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt())
    admin
    .auth()
    .createUser({
      email: req.body.email,
      password: password,
      isAdmin: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      res.status(201).json({id: userRecord.uid, ...userRecord.toJSON()})
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.status(400).json({
          message: error.message,
      })
    });
});

exports.login = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    admin
    .auth()
    .getUserByEmail(
        req.body.email
    )
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        if (await bcrypt.compare(req.body.password, userRecord.passwordHash)) {
            res.status(200).json({id: userRecord.uid, ...userRecord.toJSON()})
        } else {
            res.status(401).json({message: 'Invalid email or password'})
        }
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.status(400).json({
          message: error.message,
      })
    });
});

exports.create_data = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    admin
    .auth()
    .getUser(
        req.body.userId
    )
    .then((userRecord) => {
        admin.firestore().collection('data').add({
            user: {
                id: userRecord.uid,
                email: userRecord.email
            },
            username: req.body.username,
            text: req.body.text
        }).then(data => {
            res.status(201).json({
                message: 'Successfully created data',
                data: {
                    ...data
                }
            })
        })
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      res.status(400).json({
          message: error.message,
      })
    });
});


exports.add_log = functions.database('/data/{dataId}').onCreate((snapshot, ctx) => {
    let data = snapshot.val()
    admin.firestore().collection('log').add({
        email: data.user.email,
        timestamp: new Date()
    })
})