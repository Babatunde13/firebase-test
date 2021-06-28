import React from 'react'

const Form = () => {
    return (
        <div>
            <form className="container">
              <div className="form-group">
                  <label htmlFor="" className="email">username</label>
                  <input type="email" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="" className="password">text</label>
                  <input type="password" className="form-control" />
              </div>
              <button className="btn btn-primary btn-block">Submit</button>
            </form>  
        </div>
    )
}

export default Form
