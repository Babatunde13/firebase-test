import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(user)
    const signout = () => {
        localStorage.removeItem('userId')
        dispatch({type: 'SIGNOUT'})
        history.push('/')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" to="/">Hidden brand</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {user.email ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create/form">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/timestamp">Timestamps</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={signout} >SignOut</Link>
                            </li>
                        </> :
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth/login">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/auth/register">Sign Up</Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
