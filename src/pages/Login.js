import React from 'react'

const Login = () => {
    return (
        <div>
            <form className="container">
              <div className="form-group">
                  <label htmlFor="" className="email">Email</label>
                  <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="" className="password">Password</label>
                  <input type="password" className="form-control" />
              </div>
              <button className="btn btn-primary btn-block">Login</button>
            </form>  
        </div>
    )
}

export default Login
