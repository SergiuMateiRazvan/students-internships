import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect}
  from 'react-router-dom';
import HomePage from './pages/home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='*'>
          <Redirect to={'/'}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
