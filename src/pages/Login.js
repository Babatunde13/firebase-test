import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [signInData, setSignInData] = useState({email: '', password: ''})
    const handleChange = e => {
        let {name, value} = e.target
        setSignInData({...signInData, [name]: value})
    }
    const submitForm = e => {
        e.preventDefault();
        dispatch({type: 'SIGNIN', data: signInData})
        history.push('/')
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
              <button className="btn btn-primary btn-block">Login</button>
            </form>  
        </div>
    )
}

export default Login
