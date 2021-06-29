import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Form from "./pages/Form";
import Timestamp from "./pages/Timestamp";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  console.log('Heyyy')
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
