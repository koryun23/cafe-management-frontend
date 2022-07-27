import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import ManagerMenu from './components/ManagerMenu';
import Home from './components/ManagerHomePage'
import UserForm from './components/UserForm';
import BackgroundImage from './components/BackgroundImage';
import TableForm from './components/TableForm';
import AssignForm from './components/AssignForm';
import ProductsRegistrationForm from './components/ProductsForm';
import ViewProducts from './components/ViewProducts';
import ViewUsers from './components/ViewUsers.js';
import ViewTables from './components/ViewTables';
import WaiterMenu from './components/WaiterMenu.js';
import WaiterHomePage from './components/WaiterHomePage';

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
                <HomePage firstName="John" 
                      lastName="Smith"
                      username="john11" 
                      userRole="WAITER"/>
            </Route>
            <Route path="/users/register">
                <BackgroundImage />
                <ManagerMenu />
                <UserForm />
            </Route>
            <Route path="/tables/register">
                <BackgroundImage />
                <ManagerMenu />
                <TableForm />
            </Route>
            <Route path="/tables-to-waiters/assign">
                <BackgroundImage />
                <ManagerMenu />
                <AssignForm />
            </Route>
            <Route path="/products/register">
                <BackgroundImage />
                <ManagerMenu />
                <ProductsRegistrationForm />
            </Route>
            <Route path="/products/update/*">
                <h1>Update page not ready yet</h1>
            </Route>
            <Route path="/tables-to-waiters">
              <HomePage userType="WAITER"/>
            </Route>
            <Route path="/orders">
              <WaiterHomePage />
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
              <ManagerMenu />
              <ViewProducts />
            </Route>
            <Route path="/users">
              <ManagerMenu />
              <ViewUsers />
            </Route>
            <Route path="/tables">
              <ManagerMenu />
              <ViewTables />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
