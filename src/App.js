import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Timestamp from "./pages/Timestamp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import {getUserData} from './utils'
import { useDispatch } from "react-redux";

function App() {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('userId')) {
        getUserData(localStorage.getItem('userId')).then(res => {
          if (res.error) {
            alert(res.error)
            localStorage.removeItem('userId')
          } else {
            dispatch({type: 'SIGNIN', data: res.data})
            history.push('/')
          }
        }).catch(err => {
          console.log(err.message)
        })
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth/login' component={Login} />
        <Route exact path='/auth/register' component={Register} />
        <Route exact path='/create/form' component={Form} />
        <Route exact path='/timestamp' component={Timestamp} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
