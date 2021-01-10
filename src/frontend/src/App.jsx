import React from 'react';
import HomePage from './pages/home';
import {Register, Login} from './pages/auth';
import {Internship} from './pages/internship/Internship';
import InternshipFormPost from './pages/post';
import ProfilePage from './pages/profile';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect}
  from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/internship" component={Internship} />
        <Route path="/internship-post" component={InternshipFormPost} />
        <Route exact path='*'>
          <Redirect to={'/'}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
