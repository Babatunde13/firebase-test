import React, { useState }from 'react'

const Form = () => {
    const [formData, setFormData] = useState({username: '', password: ''})
    const handleChange = e => {
        let {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const submitForm = e => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <div>
            <form className="container" onSubmit={submitForm}>
              <div className="form-group">
                  <label htmlFor="" className="email">username</label>
                  <input name="username" onChange={handleChange}type="text" className="form-control" />
              </div>
              <div className="form-group">
                  <label htmlFor="" className="password">text</label>
                  <input name="password" onChange={handleChange}type="password" className="form-control" />
              </div>
              <button className="btn btn-primary btn-block">Submit</button>
            </form>  
        </div>
    )
}

export default Form
