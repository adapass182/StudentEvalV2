import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import AppBar from './components/navBar'
import BatchAdd from './components/batches/BatchAdd'
import BatchesPage from './components/batches/BatchesPage'
import BatchView from './components/batches/BatchView';
import LoginPage from './components/login/LoginPage'
import LogoutPage from './components/logout/LogoutPage'
import SignupPage from './components/signup/SignupPage'
import StudentAdd from './components/students/StudentAdd'
import StudentEvaluate from './components/students/StudentEvaluate'
import StudentPage from './components/students/StudentPage'
import StudentView from './components/students/StudentView'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppBar />
          <main style={{marginTop:75}}>
            <Route exact path="/" render={ () => <Redirect to="/batches" /> } />
            <Route exact path="/addbatch" component={BatchAdd} />
            <Route exact path="/batches" component={BatchesPage} />
            <Route exact path="/batch/:id" component={BatchView} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/batch/:id/addstudent" component={StudentAdd} />
            <Route exact path="/batch/:id/student/:studentid" component={StudentPage} />
            <Route exact path="/batch/:id/student/:studentid/edit" component={StudentView} />
            <Route exact path="/batch/:id/student/:studentid/evaluate" component={StudentEvaluate}/>
          </main>
        </div>
      </Router>
    )
  }
}
export default App
