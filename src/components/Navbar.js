import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(user)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="navbar-brand" href="/">Hidden brand</Link>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {user.email ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" href="/create/form">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/timestamp">Timestamps</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => {dispatch({type: 'SIGNOUT'}); history.push('/')}} href="/auth/signout">SignOut</Link>
                            </li>
                        </> :
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/auth/login">Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/auth/register">Sign Up</a>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
