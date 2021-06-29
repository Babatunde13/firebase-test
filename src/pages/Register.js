import React, {useState} from 'react'
import { signup } from '../utils/index'

const Register = () => {
    const [signUpData, setSignUpData] = useState({email: '', password: ''})

    const handleChange = e => {
        let {name, value} = e.target
        setSignUpData({...signUpData, [name]: value})
    }
    const submitForm = async e => {
        e.preventDefault();
        console.log(signUpData)
        let res = await signup(signUpData.email, signUpData.password)
        console.log(res)
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
              <button className="btn btn-primary btn-block">Register</button>
            </form>  
        </div>
    )
}

export default Register
