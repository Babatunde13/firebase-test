const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./testproject2-73370-firebase-adminsdk-l6v36-92b28dc61b.json");
const bcrypt = require("bcrypt")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


exports.register = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    console.log('Register endpoint')
    if (req.method === 'POST') {
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
            return res.status(201).json({id: userRecord.uid, ...userRecord.toJSON()})
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            return res.status(400).json({
                message: error.message,
            })
        });
    } else {
        return res.status(405).json({message: 'Method not allowed'})
    }
});

exports.login = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'POST') {
        admin
        .auth()
        .getUserByEmail(
            req.body.email
        )
        .then(async (userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully logged in:', userRecord.uid);
            if (await bcrypt.compare(req.body.password, userRecord.passwordHash)) {
                return res.status(200).json({id: userRecord.uid, ...userRecord.toJSON()})
            } else {
                return res.status(401).json({message: 'Invalid email or password'})
            }
        })
        .catch((error) => {
            console.log('Error logging in:', error);
            return res.status(400).json({
                message: error.message,
            })
        });
    } else {
        return res.status(405).json({message: 'Method not allowed'})
    }
});

exports.create_data = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    if (req.method ===  'POST') {
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
                return res.status(201).json({
                    message: 'Successfully created data',
                    data: {
                        ...data
                    }
                })
            })
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
            return res.status(400).json({
                message: error.message,
            })
        });
    } else {
        return res.status(405).json({message: 'Method not allowed'})
    }
});


exports.add_log = functions.firestore.document('/data/{dataId}').onCreate((snapshot, ctx) => {
    // let data = snapshot.exists()
    admin.firestore().collection('log').add({
        email: snapshot.data().user.email,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
})