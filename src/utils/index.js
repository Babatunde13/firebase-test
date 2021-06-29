import {config} from 'dotenv'
import axios from 'axios'

config()

const mode ={
    mode: 'no-cors'
}

export const signup = async (email, password) => {
    try {
        let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
            email, password
        }, {
            headers: {'Access-Control-Allow-Origin' : '*'}
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message,
            status: false
        }
    }
}

export const login = async (email, password) => {
    try {
        let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
            email, password
        }, mode)
        return res.data
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
        let res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create_data`, {
            username, text, userId
        }, mode)
        return res.data
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message,
            status: false
        }
    }
}
