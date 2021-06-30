import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {login } from '../utils'

const Login = () => {
    const history = useHistory()
    if (localStorage.getItem('userId')) {
        history.push('/')
    }
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [signInData, setSignInData] = useState({email: '', password: ''})
    const handleChange = e => {
        let {name, value} = e.target
        setSignInData({...signInData, [name]: value})
    }
    const submitForm = async e => {
        e.preventDefault();
        dispatch({type: 'ISLOADING'})
        let data = await login(signInData.email, signInData.password)
        if (data.error) {
            alert(data.error)
        } else {
            localStorage.setItem('userId', data.id)
            dispatch({type: 'SIGNIN', data})
            history.push('/')
        }
    }
    return (
        <div>
            <form className="container" onSubmit={submitForm}>
              <div className="form-group">
                  <label htmlFor="" className="email">Email</label>
                  <input name="email" onChange={handleChange} type="email" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="" className="password">Password</label>
                  <input name="password" onChange={handleChange} type="password" className="form-control" />
              </div>
              <button className="btn btn-primary btn-block">{user.isloading? 'Logging in...' : 'Login'}</button>
            </form>  
        </div>
    )
}

export default Login
