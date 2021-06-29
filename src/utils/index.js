import {config} from 'dotenv'
import firebase from 'firebase/app'
import 'firebase/firestore';
import bcrypt from 'bcryptjs'

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

export const signup = async (email, password) => {
    try {
        let users = await firestore.collection('users')
            .where('email', '==', email)
            .get()
        if (users.docs.length>0) {
            users.docs.forEach(doc => {console.log(doc.data())})
            return {
                error: 'email in use'
            }
        }
        let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        let newUser = await firestore.collection('users').add({
            email, password: hashedPassword, isAdmin: false
        })
        return {
            id: newUser.id, email, isAdmin: false
        }
    } catch (error) {
        console.log(error.message)
        return {
            error: error.message,
            status: false,
            code: 400
        }
    }
}

export const login = async (email, password) => {
    try {
        let users = await firestore.collection('users')
            .where('email', '==', email)
            .get()
        if (users.docs.length<1) {
            return {
                error: 'Invalid email or password'
            }
        }
        let user = users[0]
        console.log(user.data())
        let isUser = bcrypt.compareSync(password, user.data().password)
        if (isUser) {
            return {
                id: user.id, ...user.data()
            }
        } else {
            return {
                error: 'Invalid email or password'
            }
        }
    } catch (error) {
        console.log(error.message)
        return {
            error: error.message,
            status: false,
            code: 400
        }
    }
}

export const createData = async (username, text,email,  userId) => {
    try {
       let newData = await firestore.collection('data').add({
            username, text, user: {userId}
        })
        return {
            id: newData.id, text, username, user: {userId, email}
        }
    } catch (error) {
        console.log(error.message)
        return {
            error: error.message,
            status: false,
            code: 400
        }
    }
}
