import {config} from 'dotenv'
import firebase from 'firebase'
import bcrypt from 'bcrypt'

config()
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    databaseUrl: process.env.REACT_APP_databaseUrl
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const firestore = firebase.firestore()

const auth = firebase.auth()

export const signup = async (email, password) => {
    try {
        firestore.collection('users').where('email', '==', email).then(users => {
            if(users.length > 0 ) { 
                return {
                    error: 'email in use'
                }
            }
        })
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                password = hash
            });
        });
        firestore.collection('users').add({
            email, password
        }).then(user => {
            let res = {
                id: user.id, ...user.data()
            }
            console.log(res)
            return res
        })
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message,
            status: false,
            code: 400
        }
    }
}

export const login = async (email, password) => {
    try {
        firestore.collection('users').where('email', '==', email)
        .then(users => {
             let user = users[0]
             bcrypt.compare(password, user.data().password, function(err, result) {
                if (result) {
                    let res = {id: user.id, ...user.data()}
                    return res
                }
             });
        })
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message,
            status: false
        }
    }
}

export const createData = async (username, text, userId) => {
    try {
       firestore.collection('data').add({
            username, text, user: {userId}
        }).then(data => {
            let res = {
                id: data.id, ...data.data()
            }
            return res
        })
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message,
            status: false
        }
    }
}
