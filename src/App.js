import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ManagerHomePage from './components/ManagerPage';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/home">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/users/register">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/tables/register">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/tables-to-waiters/assign">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/products/register">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/products/update/*">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/tables-to-waiters">
              <HomePage userType="WAITER"/>
            </Route>
            <Route path="/orders/register/*">
              <HomePage userType="WAITER" />
            </Route>
            <Route path="/products-in-order/register/*">
              <HomePage userType="WAITER"/>
            </Route>
            <Route path="/products-in-order/update/*">
              <HomePage userType="WAITER"/>
            </Route>
            <Route path="/orders/update/*">
              <HomePage userType="WAITER"/>
            </Route>
            <Route path="/products">
              <HomePage userType="MANAGER"/>
            </Route>
            <Route path="/users">
              <HomePage userType="MANAGER"/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
