import React, { useState } from 'react'
import './App.css'
//components
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/chat/Chat'
import Login from './components/login/Login'
//routes dom
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { UseStateValue } from './components/states/StateProvider'


const App = () => {
  const [{ user }, dispatch] = UseStateValue()


  return (

    <div className="app">
      {!user ? (
        <Login />
      )
        : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path='/rooms/:roomId'>
                  <Chat />
                </Route>
                <Route path='/'>
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )}
    </div>
  );

}

export default App;
