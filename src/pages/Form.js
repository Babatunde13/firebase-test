import React, { useState }from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { createData } from '../utils'

const Form = () => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [formData, setFormData] = useState({username: '', text: ''})
    const handleChange = e => {
        let {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const submitForm = async e => {
        console.log(formData)
        e.preventDefault()
        let res = await createData(formData.username, formData.text, user.email, '..')
        console.log(res)
        if (!res.error) {
            alert('Form created successfully')
            history.push('/')
        } else {
            alert(res.error)
        }
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
                  <textarea name="text" onChange={handleChange} className="form-control" />
              </div>
              <button className="btn btn-primary btn-block">Submit</button>
            </form>  
        </div>
    )
}

export default Form
