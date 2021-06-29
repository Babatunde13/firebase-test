// import firebase from 'firebase'

// let firebaseConfig = {
//     apiKey: process.env.REACT_APP_apiKey,
//     authDomain: process.env.REACT_APP_authDomain,
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId: process.env.REACT_APP_appId,
//     databaseUrl: process.env.REACT_APP_databaseUrl
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth()

// export const firestore = firebase.firestore()

import axios from 'axios'

const signup = async (email, password) => {
    try {
        let res = await axios.post('https://us-central1-testproject2-73370.cloudfunctions.net/register', {
            email, password
        })
        return res.data
    } catch (error) {
        return {
            message: error.message,
            status: false
        }
    }
}

const login = async (email, password) => {
    try {
        let res = await axios.post('https://us-central1-testproject2-73370.cloudfunctions.net/login', {
            email, password
        })
        return res.data
    } catch (error) {
        return {
            message: error.message,
            status: false
        }
    }
}

const createData = async (username, text, userId) => {
    try {
        let res = await axios.post('https://us-central1-testproject2-73370.cloudfunctions.net/create_data', {
            username, text, userId
        })
        return res.data
    } catch (error) {
        return {
            message: error.message,
            status: false
        }
    }
}
